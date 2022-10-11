const bcrypt = require('bcryptjs')
let chats = [];

module.exports = {
    createMessage: (req, res) => {
        const {pin, message} = req.body

        //console.log(pin, message, chats)

        for(let i = 0; i < chats.length; i++){
            let existing = bcrypt.compareSync(pin, chats[i].pinHash)

            if(existing){
                chats[i].messages.push(message)
                let messagesToReturn = {...chats[i]} // added at the end
                delete messagesToReturn.pinHash // added at the end
                res.status(200).send(messagesToReturn)
                return
            }
            //console.log(pin, message, chats)
            // if(chats[i].pin === +pin){
            //     chats[i].messages.push(message)
            //     res.status(200).send(chats[i])
            //     return
            // }
        }


        let salt = bcrypt.genSaltSync(5)
        console.log(salt)
        let pinHash = bcrypt.hashSync(pin, salt)
        console.log(pin, pinHash)

        const newChat = {
            pinHash: pinHash,
        //     pin: +pin,
             messages: [message]
         }
        chats.push(newChat)
        let messagesToReturn = {...newChat} //This is to stop the sending of passwords to frontend
        delete messagesToReturn.pinHash
        res.status(200).send(messagesToReturn) //used to send newChat
    }
}