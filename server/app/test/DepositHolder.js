const {time, loadFixture} = require("@nomicfoundation/hardhat-network-helpers");
const {anyValue} = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const {expect} = require("chai");
const {ethers} = require("hardhat");

describe("DepositHolder", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deploy() {

        // Contracts are deployed using the first signer/account by default
        const signers = await ethers.getSigners();

        const buyer = signers[0]
        const seller = signers[1]
        const depositAddress = signers[2]
        const depositCost = 2

        const DepositHolder = await ethers.getContractFactory("DepositHolder");

        const depositHolder = await DepositHolder.deploy(seller, buyer, depositAddress, depositCost);

        return {depositHolder, seller, buyer, depositAddress, depositCost};
    }

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            const {depositHolder, buyer} = await loadFixture(deploy);

            expect(await depositHolder.owner()).to.equal(buyer.address);
        });

        it("Should receive and store the funds to lock", async function () {
            const {depositHolder, buyer} = await loadFixture(deploy);

            expect(await ethers.provider.getBalance(buyer.address)).to.equal(0);
        });

        it("Should fail if the unlockTime is not in the future", async function () {
            const {depositHolder, depositAddress} = await loadFixture(deploy);

            depositHolder.sendDeposit(0)

            expect(await ethers.provider.getBalance(depositAddress.address)).to.equal(2);
        });
    });


})