import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useMetamask } from "../hooks/useMetamask";

interface ABIInput {
  name: string;
  type: string;
}

interface ABIItem {
  name: string;
  type: string;
  stateMutability?: string;
  inputs?: ABIInput[];
}

// Hardcoded contract address and ABI
const HARD_CODED_CONTRACT_ADDRESS = "0xC4858Be910794946580e5270B0CCF49aeD9541EF"; // Replace with your contract address
const HARD_CODED_ABI = `[
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "AccessControlBadConfirmation",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "neededRole",
        "type": "bytes32"
      }
    ],
    "name": "AccessControlUnauthorizedAccount",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "FailedDeployment",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "balance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "needed",
        "type": "uint256"
      }
    ],
    "name": "InsufficientBalance",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidInitialization",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotInitializing",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "asset",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      }
    ],
    "name": "DataSubmitted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "walletId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "ETHDeposited",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "walletId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "ETHWithdrawn",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint64",
        "name": "version",
        "type": "uint64"
      }
    ],
    "name": "Initialized",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "taskManager",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "randomnessManager",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "priceAggregator",
        "type": "address"
      }
    ],
    "name": "ModulesUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "provider",
        "type": "address"
      }
    ],
    "name": "ProviderRegistered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "provider",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "isActive",
        "type": "bool"
      }
    ],
    "name": "ProviderUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "commitment",
        "type": "bytes32"
      }
    ],
    "name": "RandomNumberCommitted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "randomNumber",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "nonce",
        "type": "uint256"
      }
    ],
    "name": "RandomNumberRevealed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "previousAdminRole",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "newAdminRole",
        "type": "bytes32"
      }
    ],
    "name": "RoleAdminChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "RoleGranted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "RoleRevoked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "droneId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "taskType",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "parameters",
        "type": "string"
      }
    ],
    "name": "TaskAssigned",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "taskId",
        "type": "uint256"
      }
    ],
    "name": "TaskCompleted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "taskId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "success",
        "type": "bool"
      }
    ],
    "name": "TaskExecuted",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "DEFAULT_ADMIN_ROLE",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "droneId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "taskType",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "parameters",
        "type": "string"
      }
    ],
    "name": "assignTask",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "noiseValues",
        "type": "uint256[]"
      }
    ],
    "name": "collectNoise",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_commitment",
        "type": "bytes32"
      }
    ],
    "name": "commitToRandomNumber",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "taskId",
        "type": "uint256"
      }
    ],
    "name": "completeTask",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "depositToWallet",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "droneRegistry",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "execute",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "taskId",
        "type": "uint256"
      }
    ],
    "name": "executeTask",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "asset",
        "type": "bytes32"
      }
    ],
    "name": "getPrice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getRandomNumber",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      }
    ],
    "name": "getRoleAdmin",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "grantRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "hasRole",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_protocolController",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_wallet",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_droneRegistry",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_taskManagerImpl",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_randomnessManagerImpl",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_priceAggregatorImpl",
        "type": "address"
      }
    ],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "bytes4",
        "name": "",
        "type": "bytes4"
      }
    ],
    "name": "isAuthorized",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "moduleInfo",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "onInstall",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "onUninstall",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "priceAggregator",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "randomnessManager",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "provider",
        "type": "address"
      }
    ],
    "name": "registerProvider",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "callerConfirmation",
        "type": "address"
      }
    ],
    "name": "renounceRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_randomNumber",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_nonce",
        "type": "uint256"
      }
    ],
    "name": "revealRandomNumber",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "revokeRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "asset",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      }
    ],
    "name": "submitData",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "supportedFunctions",
    "outputs": [
      {
        "internalType": "bytes4[]",
        "name": "selectors",
        "type": "bytes4[]"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "selector",
        "type": "bytes4"
      }
    ],
    "name": "supportsFunction",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "taskManager",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "provider",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "isActive",
        "type": "bool"
      }
    ],
    "name": "updateProvider",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "wallet",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "withdrawFromWallet",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]`;

const UnifiedOracleDrone: React.FC = () => {
    const { account, connectWallet, signer } = useMetamask();
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [response, setResponse] = useState<string>("");
  const [abiMethods, setAbiMethods] = useState<ABIItem[]>([]);
  const [inputValues, setInputValues] = useState<Record<string, string[]>>({});
  const [interfaceCode, setInterfaceCode] = useState<string>("");

  // Generate a TypeScript interface based on the ABI methods
  const generateInterfaceCode = (abi: ABIItem[]) => {
    const code = `
interface ContractInterface {
  ${abi
    .map(
      (fn) =>
        `${fn.name}(${fn.inputs
          ?.map((input) => `${input.name}: ${input.type}`)
          .join(", ")}): Promise<any>;`
    )
    .join("\n  ")}
}
    `;
    console.log("Generated TypeScript Interface:\n", code);
    return code;
  };

  // Initialize the contract instance using the hardcoded address and ABI
  const initializeContract = async () => {
    try {
      if (!signer) {
        setResponse("❌ Please connect your wallet.");
        return;
      }

      // Parse the hardcoded ABI and filter only functions
      const parsedABI: ABIItem[] = JSON.parse(HARD_CODED_ABI);
      const filteredMethods = parsedABI.filter((fn) => fn.type === "function");

      // Create a new contract instance using the hardcoded address and ABI
      const contractInstance = new ethers.Contract(
        HARD_CODED_CONTRACT_ADDRESS,
        parsedABI,
        signer
      );

      setAbiMethods(filteredMethods);
      setContract(contractInstance);
      setInterfaceCode(generateInterfaceCode(filteredMethods));
      setResponse("✅ Contract Initialized!");
    } catch (error: any) {
      console.error("🚨 Error initializing contract:", error);
      setResponse("❌ Invalid ABI or contract address.");
    }
  };


  const executeFunction = async (methodName: string, isView: boolean) => {
    if (!contract) {
      alert("⚠️ Contract not initialized!");
      return;
    }
    setResponse("");

    try {
      const args = inputValues[methodName] || [];
      const result = isView
        ? await contract[methodName](...args)
        : await (await contract[methodName](...args)).wait();

      const formattedResult = Array.isArray(result)
        ? result.map((item) => (typeof item === "bigint" ? item.toString() : item))
        : typeof result === "bigint"
        ? result.toString()
        : result;

      setResponse(
        isView
          ? `✅ Fetched: ${JSON.stringify(formattedResult)}`
          : `✅ Transaction successful`
      );
    } catch (error: any) {
      console.error(`🚨 Error executing ${methodName}:`, error);
      setResponse(`❌ Error: ${error.message || error}`);
    }
  };

  useEffect(() => {
    if (signer) {
      initializeContract();
    }
  }, [signer]);


   return (
    <div style={{
      padding: "24px",
      maxWidth: "800px",
      margin: "0 auto",
      backgroundColor: "#1E1E2F", // Deep navy background
      borderRadius: "12px",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
      color: "LavenderBlush",
      fontFamily: "'Bradley DJR Variable', sans-serif"
    }}>
      
      {/* 🔹 Logo at the Top */}
      <div style={{ textAlign: "center", marginBottom: "16px" }}>
        <img src="/logo.jpeg" alt="App Logo" style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
      </div>

      <h2 style={{ fontSize: "26px", fontWeight: "bold", marginBottom: "16px", textAlign: "center" }}>
        Iconoclast Unified Oracle Drone
      </h2>

      {/* 🔹 Wallet Connection */}
      {account ? (
        <p style={{ color: "lightgreen", fontWeight: "bold", marginBottom: "10px", textAlign: "center" }}>
          ✅ Wallet Connected: {account}
        </p>
      ) : (
        <button
          onClick={connectWallet}
          style={{
            backgroundColor: "indigo",
            color: "LavenderBlush",
            padding: "12px",
            borderRadius: "12px",
            border: "2px solid darkgray",
            width: "100%",
            fontWeight: "bold",
            fontSize: "16px",
            transition: "all 0.3s ease-in-out"
          }}
        >
          🔗 Connect Wallet
        </button>
      )}

     

      {/* 🔹 Response Messages */}
      {response && (
        <p
          style={{
            marginTop: "10px",
            color: response.includes("✅") ? "lightgreen" : "red",
            fontWeight: "bold",
            textAlign: "center"
          }}
        >
          {response}
        </p>
      )}

      {/* 🔹 Contract Methods Section */}
      {contract && (
        <>
          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              border: "1px solid #555",
              borderRadius: "12px",
              background: "#2A2A3D",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)"
            }}
          >
            {/* 🔹 Replacing "Contract Methods" Title with Logo */}
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
              <img src="/logo.jpeg" alt="Logo" style={{ width: "80px", height: "80px", borderRadius: "50%" }} />
            </div>

            {abiMethods.map((fn) => (
              <div key={fn.name} style={{ padding: "10px", borderBottom: "1px solid #444" }}>
                <h4 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "5px" }}>{fn.name}</h4>

                {/* 🔹 Inputs for functions */}
                {fn.inputs?.map((input, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder={`${input.name} (${input.type})`}
                    value={inputValues[fn.name]?.[index] || ""}
                    onChange={(e) =>
                      setInputValues((prev) => {
                        const currentValues = prev[fn.name] ? [...prev[fn.name]] : [];
                        currentValues[index] = e.target.value;
                        return { ...prev, [fn.name]: currentValues };
                      })
                    }
                    style={{
                      marginBottom: "5px",
                      padding: "10px",
                      border: "1px solid darkgray",
                      borderRadius: "12px",
                      width: "100%",
                      backgroundColor: "#333",
                      color: "LavenderBlush",
                      fontSize: "1rem"
                    }}
                  />
                ))}

                {/* 🔹 Execute Button */}
                <button
                  onClick={() =>
                    executeFunction(fn.name, fn.stateMutability === "view")
                  }
                  style={{
                    backgroundColor: "indigo",
                    color: "LavenderBlush",
                    padding: "10px",
                    borderRadius: "12px",
                    border: "2px solid darkgray",
                    width: "100%",
                    fontWeight: "bold",
                    fontSize: "16px",
                    marginTop: "5px",
                    transition: "all 0.3s ease-in-out"
                  }}
                >
                  {fn.stateMutability === "view" ? "Fetch" : "Execute"}
                </button>
              </div>
            ))}
          </div>

          {/* 🔹 Underlying Code Section (Now with Logo Instead of Gold Title) */}
          {interfaceCode && (
            <div
              style={{
                marginTop: "20px",
                padding: "15px",
                border: "1px solid #555",
                borderRadius: "12px",
                background: "#2A2A3D",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)"
              }}
            >
              {/* 🔹 Replacing "Underlying Code for the GUI" Title with Logo */}
              <div style={{ textAlign: "center", marginBottom: "10px" }}>
                <img src="/logo.jpeg" alt="Logo" style={{ width: "80px", height: "80px", borderRadius: "50%" }} />
              </div>

              <pre
                style={{
                  background: "#1E1E2F",
                  padding: "12px",
                  borderRadius: "8px",
                  overflowX: "auto",
                  color: "LavenderBlush",
                  fontSize: "14px"
                }}
              >
              </pre>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UnifiedOracleDrone;
;