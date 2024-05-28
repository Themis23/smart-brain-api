const handleRegister = (req, res, db, bcrypt) => {
  const { name, email, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json("incorrect form submission");
  }
  const hash = bcrypt.hashSync(password);

  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .returning("*")
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date(),
          })
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) => {
            trx.rollback();
            res.status(400).json("unable to register user");
          });
      })
      .then(trx.commit)
      .catch((err) => {
        trx.rollback();
        res.status(400).json("unable to register user");
      });
  }).catch((err) => {
    res.status(400).json("unable to register transaction");
  });
};

module.exports = {
  handleRegister: handleRegister,
};
