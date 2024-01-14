import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import { authOptions } from "../auth/[...nextauth]";
import db from 'lib/db';

const feature = db.collection('feature');
const account = db.collection('account');

const featureListHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { page, limit = 20, wallet } = req.query;
  const p = Number(page) || 1;

  try {
    const accountData = wallet ? await account.findOne({
      wallet: wallet
    }) : null;

    const pipeline = accountData ? [
      {
        $addFields: {
          id: {$toString: "$_id"}
        }
      },
      {
        $lookup: {
          from: "feature_entry",
          let: {feature_id: "$id"},
          as: "entry",
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {$eq: ["$feature_id", "$$feature_id"]},
                    {$eq: ["$account_id", accountData._id.toString()]}
                  ]
                }
              }
            },
            {
              $addFields: {
                id: {$toString: "$_id"}
              }
            },
            {
              $project: {_id: 0, "id": 1, "status": 1, "account_id": 1}
            },
            {
              $limit: 1
            }
          ]
        }
      },
      {
        $unwind: {
          path: "$entry",
          preserveNullAndEmptyArrays: true
        },
      },
      {
        $project: {
          _id: 0
        }
      },
      {
        $sort: {
          'start_time': -1
        }
      },
      {
        $skip: (p - 1) * +limit
      },
      {
        $limit: +limit
      }
    ] : [
      {
        $addFields: {
          id: {$toString: "$_id"}
        }
      },
      {
        $project: {
          _id: 0
        }
      },
      {
        $sort: {
          'start_time': -1
        }
      },
      {
        $skip: (p - 1) * +limit
      },
      {
        $limit: +limit
      }
    ]

    const cursor = await feature.aggregate(pipeline);
    const featureList = await cursor.toArray() || [];

    return res.status(200).json(featureList);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'ERROR', message: 'Internal Server Error' });
  }
};

export default featureListHandler;
