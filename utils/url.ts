export const setParams = (url: URL, query: {
  [x: string]: any;
}) => {
  Object.keys(query).map((key) => {
    let value = query[key];
    if (value !== undefined) {
      if (Array.isArray(value)) value.forEach((item) => {
        url.searchParams.append(key, item);
      });
      else url.searchParams.append(key, query[key]?.toString());
    }
    return url;
  });
}
