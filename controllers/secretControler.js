const prisma = require("../prisma/prismaClient");

const encrypt = require("../helpers/encrypt");
const decrypt = require("../helpers/decrypt");


exports.getSecrets = async (req, res) => {

    try {
        let secrets = await prisma.secret.findMany({
            where: {
                userId: req.user.id,
            },
        })
        res.status(200).send({
            success: true,
            secrets: decrypt(secrets)
        })

    } catch (err) {
        console.log(err);
        res.status(500).send("An error occurred");
    }
}


exports.postSecrets = async (req, res) => {

    try {
        const userId = req.user.id;
        const { title, url, username, email, password } = req.body.data;
    
        const secret = await prisma.secret.create({
          data: encrypt({
            title,
            url,
            username,
            email,
            password,
            userId, // Associate the secret with the user
          }),
        });
    
        res.status(200).json({
            success: true,
            secrets: secret
        })

    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
};


exports.deleteSecret = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.body.data;
        console.log(id);

        const secret = await prisma.secret.findUnique({
            where: {
                id: id,
            }
        })

        if(secret.userId !== userId){
            res.status(200).send({
                success: false,
                secret: secret
            })
        }
        
    
        let deletedSecret = await prisma.secret.delete({
            where: {
                id: id
            },
        })

        console.log(secret);
    
        res.status(200).send({
            success: true,
            secret: deletedSecret
        })

    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
}


exports.updateSecret = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.body.data;
        const { title, url, username, email, password } = req.body.data;

        const secret = await prisma.secret.findUnique({
            where: {
                id: id,
            }
        })

        if(secret.userId !== userId){
            res.status(200).send({
                success: false,
                secret: secret
            })
        }

        const now = new Date();
        const formattedDate = now.toISOString();
        let updatedSecret = await prisma.secret.update({
            where: {
                id: id
            },
            data: encrypt({
                title,
                url,
                username,
                email,
                password,
                userId,
                updatedat: formattedDate,
              }), 
        })
    
        res.status(200).send({
            success: true,
            secret: updatedSecret
        })

    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
}