// models/Comment.js
import { DataTypes } from "sequelize";
import sequelize from "../../utils/db_s.js";

const Comment = sequelize.define("Comment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Status: {
    type: DataTypes.ENUM("active", "inactive"),
    defaultValue: "active",
  },
  Content: {
    type: DataTypes.TEXT,
  },
  AuthorID: {
    type: DataTypes.INTEGER,
    references: {
      model: "Users",
      key: "id",
    },
  },
  AuthorID: {
    type: DataTypes.INTEGER,
    references: {
      model: "Users",
      key: "id",
    },
  },
  PostID: {
    type: DataTypes.INTEGER,
    references: {
      model: "Posts",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  ParentCommentID: {
    type: DataTypes.INTEGER,
    references: {
      model: "Comments",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  isBlocked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal(
      "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
    ),
  },
});

Comment.associate = (models) => {
  Comment.belongsTo(models.Post, {
    foreignKey: "PostID",
    as: "post",
    onDelete: "CASCADE",
  });
  Comment.belongsTo(models.User, { foreignKey: "AuthorID", as: "author" });
  Comment.belongsTo(models.Comment, {
    foreignKey: "ParentCommentID",
    as: "parentComment",
    onDelete: "CASCADE",
  });
};

await Comment.sync();

export default Comment;
