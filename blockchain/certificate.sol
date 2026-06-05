// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StudentCertificate is ERC721, Ownable {

    uint256 public nextTokenId;

    struct Certificate {
        string studentName;
        string course;
        string ipfsHash;
        uint256 issuedAt;
    }

    mapping(uint256 => Certificate) public certificates;

    constructor() ERC721("StudentCertificate", "CERT") {}

    function issueCertificate(
        address student,
        string memory studentName,
        string memory course,
        string memory ipfsHash
    ) external onlyOwner {

        uint256 tokenId = nextTokenId++;

        _safeMint(student, tokenId);

        certificates[tokenId] = Certificate(
            studentName,
            course,
            ipfsHash,
            block.timestamp
        );
    }

    function verifyCertificate(
        uint256 tokenId
    ) external view returns(bool) {

        return ownerOf(tokenId) != address(0);
    }
}