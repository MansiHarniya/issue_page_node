const testConroller = async (req, res) => {
  res.send();
  console.log("reqest User :- ",req.user);
};

module.exports = { testConroller };
