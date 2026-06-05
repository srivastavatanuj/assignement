const pinataSDK = require("@pinata/sdk");

const pinata = new pinataSDK(
    process.env.PINATA_API_KEY,
    process.env.PINATA_SECRET_KEY
);

const issueCertificate = async (req, res) => {
    try {

        const metadata = {
            studentName: req.body.studentName,
            courseName: req.body.courseName,
            grade: req.body.grade,
            issueDate: req.body.issueDate,
            issuedAt: new Date().toISOString()
        };

        const result =
            await pinata.pinJSONToIPFS(metadata);

        return res.status(200).json({
            success: true,
            cid: result.IpfsHash,
            ipfsUrl: `https://ipfs.io/ipfs/${result.IpfsHash}`
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    issueCertificate
};
