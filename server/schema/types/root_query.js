const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
} = graphql;
const { User, Role, Team, IsAdmin, IsDm, Date } = require('./types');
const Users = require('../../models/user');
const Roles = require('../../models/role');
const Teams = require('../../models/team');
const AreAdmin = require('../../models/isAdmin');
const AreDm = require('../../models/isDm');
const Dates = require('../../models/date');

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    users: {
      type: new GraphQLList(User),
      resolve() {
        return Users.find();
      },
    },
    user: {
      type: User,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Users.findById(id);
      },
    },
    teams: {
      type: new GraphQLList(Team),
      resolve() {
        return Teams.find({});
      },
    },
    team: {
      type: new GraphQLList(Team),
      args: { year: { type: GraphQLString }, month: { type: GraphQLString } },
      resolve(parentValue, { year, month }) {
        return Teams.find({year,month});
      },
    },
    roles: {
      type: new GraphQLList(Role),
      resolve() {
        return Roles.find({});
      },
    },
    role: {
      type: Role,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Roles.findById(id);
      },
    },
    isAdmin: {
      type: new GraphQLList(IsAdmin),
      resolve() {
        return AreAdmin.find({});
      },
    },
    isDm: {
      type: new GraphQLList(IsDm),
      resolve() {
        return AreDm.find({});
      },
    },
    dates: {
      type: new GraphQLList(Date),
      resolve() {
        return Dates.find({});
      },
    },
    date: {
      type: Date,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Dates.findById(id);
      },
    },
  }),
});
module.exports = RootQuery;
