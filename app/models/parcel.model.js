module.exports = mongoose => {
    let schema = mongoose.Schema(
        {
            username: {
                type: String,
                required: true,
                createIndexes: {unique: true},
                unique: true
            },
            dates: {type: [Date]},
            codes: {type: [String]}
        }
    );

    schema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    const Parcel = mongoose.model("parcel", schema);
    return Parcel;
};