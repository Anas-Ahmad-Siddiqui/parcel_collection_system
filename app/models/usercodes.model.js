module.exports = mongoose => {
    let schema = mongoose.Schema(
        {
            code: {
                type: String,
                required: true,
                createIndexes: {unique: true},
                unique: true
            },
            username: {type: String}
        }
    );

    schema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    const UserCodes = mongoose.model("userCodes", schema);
    return UserCodes;
};