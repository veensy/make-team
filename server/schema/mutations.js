const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull } = graphql;
const { User, Role, Team, IsAdmin, IsDm, Date } = require('./types/types');
const Users = require('../models/user');
const Roles = require('../models/role');
const Teams = require('../models/team');
const AreAdmin = require('../models/isAdmin');
const AreDm = require('../models/isDm');
const Dates = require('../models/date');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: User,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        roleId: { type: GraphQLID },
        isAdminId: { type: GraphQLID },
        isDmId: { type: GraphQLID },
      },
      resolve(parentValue, { name, roleId, isAdminId, isDmId }) {
        return new Users({ name, roleId, isAdminId, isDmId }).save();
      },
    },
    addTeam: {
      type: Team,
      args: {
        year: { type: new GraphQLNonNull(GraphQLString) },
        month: { type: new GraphQLNonNull(GraphQLString) },
        sunday: { type: new GraphQLNonNull(GraphQLString) },
        md: { type: GraphQLString },
        bass: { type: GraphQLString },
        guitar: { type: GraphQLString },
        keyboard: { type: GraphQLString },
        drum: { type: GraphQLString },
      },
      resolve(
        parentValue,
        { year, month, sunday, md, bass, guitar, keyboard, drum }
      ) {
        return new Teams({
          year,
          month,
          sunday,
          md,
          bass,
          guitar,
          keyboard,
          drum,
        }).save();
      },
    },
    addRole: {
      type: Role,
      args: { role: { type: new GraphQLNonNull(GraphQLString) } },
      resolve(parentValue, { role }) {
        return new Roles({ role }).save();
      },
    },
    addIsAdmin: {
      type: IsAdmin,
      args: { status: { type: new GraphQLNonNull(GraphQLString) } },
      resolve(parentValue, { status }) {
        return new AreAdmin({ status }).save();
      },
    },
    addIsDm: {
      type: IsDm,
      args: { status: { type: new GraphQLNonNull(GraphQLString) } },
      resolve(parentValue, { status }) {
        return new AreDm({ status }).save();
      },
    },
    updateUser: {
      type: User,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        roleId: { type: GraphQLID },
        isAdminId: { type: GraphQLID },
        isDmId: { type: GraphQLID },
      },
      resolve(parentValue, { id, name, roleId, isAdminId, isDmId }) {
        return Users.findByIdAndUpdate(
          id,
          {
            name,
            roleId,
            isAdminId,
            isDmId,
          },
          { omitUndefined: true }
        );
      },
    },
    updateTeam: {
      type: Team,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        md: { type: GraphQLString },
        bass: { type: GraphQLString },
        guitar: { type: GraphQLString },
        keyboard: { type: GraphQLString },
        drum: { type: GraphQLString },
      },
      resolve(parentValue, { id, md, bass, guitar, keyboard, drum }) {
        return Teams.findByIdAndUpdate(
          id,
          { md, bass, guitar, keyboard, drum },
          { omitUndefined: true }
        );
      },
    },
    deleteTeam: {
      type: Team,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parentValue, {  id }) {
        return Teams.findByIdAndDelete( id);
      },
    },
    deleteUser: {
      type: User,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parentValue, { id }) {
        return Users.findByIdAndDelete(id);
      },
    },
  },
});

module.exports = mutation;
