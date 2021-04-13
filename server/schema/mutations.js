const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull } = graphql;
const { User, Role, Team, IsAdmin, IsDm, List } = require('./types/types');
const Users = require('../models/user');
const Roles = require('../models/role');
const Teams = require('../models/team');
const AreAdmin = require('../models/isAdmin');
const AreDm = require('../models/isDm');
const Lists = require('../models/list');

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
        day: { type: new GraphQLNonNull(GraphQLString) },
        md: { type: GraphQLString },
        bass: { type: GraphQLString },
        guitar: { type: GraphQLString },
        keyboard: { type: GraphQLString },
        drum: { type: GraphQLString },
        city: { type: new GraphQLNonNull(GraphQLString) },
        event: { type: new GraphQLNonNull(GraphQLString) },
        eventName: { type: GraphQLString },
      },
      resolve(
        parentValue,
        {
          year,
          month,
          day,
          md,
          bass,
          guitar,
          keyboard,
          drum,
          city,
          event,
          eventName,
        }
      ) {
        return new Teams({
          year,
          month,
          day,
          md,
          bass,
          guitar,
          keyboard,
          drum,
          city,
          event,
          eventName,
        }).save();
      },
    },
    addList: {
      type: List,
      args: {
        year: { type: new GraphQLNonNull(GraphQLString) },
        month: { type: new GraphQLNonNull(GraphQLString) },
        day: { type: new GraphQLNonNull(GraphQLString) },
        city: { type: new GraphQLNonNull(GraphQLString) },
        event: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: GraphQLString },
        link: { type: GraphQLString },
        eventName: { type: GraphQLString },
      },
      resolve(
        parentValue,
        { year, month, day, title, link, city, event, eventName }
      ) {
        return new Lists({
          year,
          month,
          day,
          title,
          link,
          city,
          event,
          eventName,
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
        year: { type: new GraphQLNonNull(GraphQLString) },
        month: { type: new GraphQLNonNull(GraphQLString) },
        day: { type: new GraphQLNonNull(GraphQLString) },
        city: { type: new GraphQLNonNull(GraphQLString) },
        event: { type: new GraphQLNonNull(GraphQLString) },
        md: { type: GraphQLString },
        bass: { type: GraphQLString },
        guitar: { type: GraphQLString },
        keyboard: { type: GraphQLString },
        drum: { type: GraphQLString },
        eventName: { type: GraphQLString },
      },
      resolve(
        parentValue,
        {
          id,
          md,
          bass,
          guitar,
          keyboard,
          drum,
          eventName,
          year,
          month,
          day,
          city,
          event,
        }
      ) {
        return Teams.findByIdAndUpdate(
          id,
          {
            md,
            bass,
            guitar,
            keyboard,
            drum,
            eventName,
            year,
            month,
            day,
            city,
            event,
          },
          { omitUndefined: true }
        );
      },
    },
    updateList: {
      type: List,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        link: { type: GraphQLString },
        eventName: { type: GraphQLString },
      },
      resolve(parentValue, { id, title, link, eventName }) {
        return Lists.findByIdAndUpdate(
          id,
          { title, link, eventName },
          { omitUndefined: true }
        );
      },
    },
    deleteTeam: {
      type: Team,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parentValue, { id }) {
        return Teams.findByIdAndDelete(id);
      },
    },
    deleteList: {
      type: List,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parentValue, { id }) {
        return Lists.findByIdAndDelete(id);
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
