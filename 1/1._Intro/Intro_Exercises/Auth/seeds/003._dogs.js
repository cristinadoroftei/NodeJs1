exports.seed = function(knex) {
    return knex('dogs').insert([
        { breed: "American Bulldog", description: "The American Bulldog is stocky and muscular, but also agile and built for chasing down stray cattle and helping out with work on the farm.", imageUrl: "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2020/01/14144341/American-Bulldog-standing-in-three-quarter-view.jpg"}
    ])
}