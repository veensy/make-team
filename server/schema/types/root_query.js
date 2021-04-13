const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
} = graphql;
const { User, Role, Team, IsAdmin, IsDm, List } = require('./types');
const Users = require('../../models/user');
const Roles = require('../../models/role');
const Teams = require('../../models/team');
const AreAdmin = require('../../models/isAdmin');
const AreDm = require('../../models/isDm');
const Lists = require('../../models/list');

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
      args: {
        year: { type: GraphQLString },
        month: { type: GraphQLString },
        city: { type: GraphQLString },
        event: { type: GraphQLString },
      },
      resolve(parentValue, { year, month, city, event }) {
        return Teams.find({ year, month, city, event });
      },
    },
    lists: {
      type: new GraphQLList(List),
      resolve() {
        return Lists.find({});
      },
    },
    list: {
      type: new GraphQLList(List),
      args: {
        year: { type: GraphQLString },
        month: { type: GraphQLString },
        city: { type: GraphQLString },
        event: { type: GraphQLString },
      },
      resolve(parentValue, { year, month, city }) {
        return Lists.find({ year, month, city });
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
  }),
});
module.exports = RootQuery;
