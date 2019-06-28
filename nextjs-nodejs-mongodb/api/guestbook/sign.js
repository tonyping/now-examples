// Import Dependencies
const connect = require("../../lib/db")

// The main exported function that handles the request and response
module.exports = async (req, res) => {
  // Destructure variables from the request body
  // (converted to JSON using micro)
  const { signature, id, user } = req.body
  const updated = new Date()

  // Reject request if no signature is provided in the JSON
  if (!signature) {
    res.status(400).json({message: 'Request is missing a "signature" property.'})
  }

  // Connect to MongoDB and get the database
  const database = await connect()

  // Select the "signatures" collection to insert to
  const signaturesCollection = await database.collection('signatures')

  // Find if a signature exists for the current user
  const existing = await signaturesCollection.findOne({ id })

  // If the user exists, update the signature
  // If the user is new, insert the signature
  if (existing) {
    await signaturesCollection.updateOne({ id }, { $set: {user, signature, updated }})
    res.end()
  } else {
    await signaturesCollection.insertOne({id: id.toString(), user, signature, updated })
    res.json({ id, user, signature, updated })
  }
}
