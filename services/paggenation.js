/**
 * Paggination service function for all model...

 */
const pagination = async (page, limit, model) => {
  console.log("=== pagination services ===");
  const pageNumber = parseInt(page);
  const pageLimit = parseInt(limit);

  const startIndex = (pageNumber - 1) * pageLimit;
  const endIndex = pageNumber * pageLimit;

  const results = {};

  if (endIndex < (await model.countDocuments().exec())) {
    results.next = {
      pageNumber: pageNumber + 1,
      pageLimit: pageLimit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      pageNumber: pageNumber - 1,
      pageLimit: pageLimit,
    };
  }
  try {
    // console.log(user.limit(pageLimit));
    console.log(await model.find().limit(limit).skip(startIndex).exec());
    const data = await model.find().limit(limit).skip(startIndex).exec();
    return data;
  } catch (e) {
    console.log(e);
    return e;
    // res.status(500).json({ message: e.message });
  }
};

module.exports = { pagination };
