/**
 * Get product data from database based on query and queryType,
 * and return paginated results with pagination metadata.
 *
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @returns - Paginated product data with metadata, or error message
 */
const getProduct = (req, res) => {
  const database = req.context.database;
  const { page = 1, query, queryType } = req.query;
  const pageNumber = parseInt(page);
  const data = database.get(query, queryType);
  const perPage = 10;
  const start = (parseInt(pageNumber) - 1) * perPage;
  const end = start + perPage;
  const pageData = data?.slice(start, end);
  if (pageData) {
    return res.status(200).send({
      pageData: pageData,
      currentPage: pageNumber,
      totalPages: Math.ceil(data.length / perPage),
      totalProduct: data.length,
    });
  } else {
    return res.status(500).send({ msg: "error" });
  }
};

/**
 * Get product data for a specific product number from database.
 *
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @returns - Product's detail data, or error message
 */
const getProductData = (req, res) => {
  const productNumber = req.params.id;
  const database = req.context.database;
  const data = database.getByProductNumber(productNumber);
  if (data) {
    res.status(200).send(data);
  } else {
    return res.status(500).send({ msg: "error" });
  }
};

/**
 * Add a new product to the database.
 *
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @returns - Success message, or error message
 */
const postProduct = (req, res) => {
  const database = req.context.database;
  const data = database.post(req.body);
  if (data) {
    return res.status(200).send({ msg: "Successfully Add" });
  } else {
    return res.status(500).send({ msg: "error" });
  }
};

/**
 * Update an existing product in the database.
 *
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @returns - Success message, or error message
 */
const putProduct = (req, res) => {
  const database = req.context.database;
  const data = database.put(req.body.productNumber, req.body.values);
  if (data) {
    return res.status(200).send({ msg: "Successfully Edit" });
  } else {
    return res.status(500).send({ msg: "error" });
  }
};

/**
* Delete a product from the database.
*
@param {*} req - The HTTP request object.
@param {*} res - The HTTP response object.
@returns A success message or an error message.
*/
const deleteProduct = (req, res) => {
  const database = req.context.database;
  const data = database.delete(req.body.productNumber);
  if (data) {
    return res.status(200).send({ msg: "Successfully Delete" });
  } else {
    return res.status(500).send({ msg: "error" });
  }
};

module.exports = {
  getProduct,
  getProductData,
  postProduct,
  putProduct,
  deleteProduct,
};