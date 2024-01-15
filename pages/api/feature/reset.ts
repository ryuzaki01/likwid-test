import type {NextApiRequest, NextApiResponse} from "next";
import db from "lib/db";

const account = db.collection('account')
const featureEntry = db.collection('feature_entry')

// Will run daily at midnight
const expResetHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const expireDateLimit = ((new Date()).getTime() / 1000) - (60 * 60 * 24 * 30) // 1 Month

  const expiredUsers = await account.find({
    lastLogin: { $lt: expireDateLimit },
    lastActivity: { $lt: expireDateLimit },
  }).toArray()

  // Reset Exp
  await account.updateMany({
    _id: {
      $in: (expiredUsers || []).map(user => user._id)
    }
  }, {
    $set: {
      exp: 0
    }
  })

  // Reset Tasks Progress
  await featureEntry.deleteMany({
    account_id: {
      $in: (expiredUsers || []).map(user => user._id.toString())
    }
  })

  return res.status(200).end('Success');
}

export default expResetHandler;