module.exports = mongoose => {
    let schema = mongoose.Schema(
        {
            username: {
                type: String,
                required: true,
                createIndexes: {unique: true},
                unique: true
            },
            password: {type: String, required: true},
            name: {type: String},
            email: {type: String},
            flat_no: {type: String}
        }
    );

    schema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    const User = mongoose.model("user", schema);
    return User;
};