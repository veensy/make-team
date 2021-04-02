const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = graphql;
const Users = require("../../models/user");
const Roles = require("../../models/role");
const Teams = require("../../models/team");
const AreAdmin = require('../../models/isAdmin');
const AreDm = require('../../models/isDm');

const Team = new GraphQLObjectType({
  name: "Team",
  fields: () => ({
    id: { type: GraphQLID },
    year: { type: GraphQLString },
    month: { type: GraphQLString },
    sunday: { type: GraphQLString },
    md: { type: GraphQLString },
    bass:{ type: GraphQLString },
    guitar:{ type: GraphQLString },
    keyboard: { type: GraphQLString },
    drum:{ type: GraphQLString },
    users: {
      type: new GraphQLList(User),
      resolve(parentValue, args) {
        return Users.find({ teamId: parentValue.id });
      }
    }
  })
});

const Role = new GraphQLObjectType({
  name: "Role",
  fields: () => ({
    id: { type: GraphQLID },
    role: { type: GraphQLString },
    users: {
      type: new GraphQLList(User),
      resolve(parentValue, args) {
        return Users.find({ roleId: parentValue.id });
      }
    }
  })
});

const User = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    role: {
      type: Role,
      resolve(parentValue, args) {
        return Roles.findById(parentValue.roleId);
      }
    },
    isAdmin: {
      type: IsAdmin,
      resolve(parentValue, args) {
        return AreAdmin.findById(parentValue.isAdminId);
      }
    },
    isDm: {
      type: IsDm,
      resolve(parentValue, args) {
        return AreDm.findById(parentValue.isDmId);
      }
    }
  })
});

const IsDm = new GraphQLObjectType({ 
  name:'IsDm',
  fields:()=>({
    id: { type: GraphQLID },
    status: { type: GraphQLString },
    users: {
      type: new GraphQLList(User),
      resolve(parentValue, args) {
        if(parentValue.status === "yes"){
        return Users.find({ isDmId: parentValue.id });
      }
      }
    }
  })
})

const IsAdmin = new GraphQLObjectType({ 
  name:'IsAdmin',
  fields:()=>({
    id: { type: GraphQLID },
    status: { type: GraphQLString },
    users: {
      type: new GraphQLList(User),
      resolve(parentValue, args) {
        return Users.find({ isAdminId: parentValue.id });
      }
    }
  })
})

const Date =  new GraphQLObjectType({ 
  name:'Date',
  fields:()=>({
    id: { type: GraphQLID },
    year: { type: GraphQLString },
    month: { type: GraphQLString },
  })
})

module.exports = { User, Role, Team,IsDm,IsAdmin,Date };
