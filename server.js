const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const path = require('path');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const app = express();
const PORT = process.env.PORT || 3001;

const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
//session options
const sess = {
  secret: process.env.SECRET,
  cookie: {
    maxAge: ONE_DAY_IN_MILLISECONDS,
  },
  rolling: true,
  resave: false,
  saveUninitialized: false,
  name: 'tblg.sid',
  unset: 'destroy',
  store: new SequelizeStore({
    db: sequelize,
  }),
};
app.use(session(sess));
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
