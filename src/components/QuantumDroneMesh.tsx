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
const HARD_CODED_CONTRACT_ADDRESS = "0xE9ECA5603D31250A71f56F57B4d7850E4F8323D1"; // Replace with your contract address
const HARD_CODED_ABI = `[
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "ERC721IncorrectOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ERC721InsufficientApproval",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "approver",
        "type": "address"
      }
    ],
    "name": "ERC721InvalidApprover",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "ERC721InvalidOperator",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "ERC721InvalidOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      }
    ],
    "name": "ERC721InvalidReceiver",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "ERC721InvalidSender",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ERC721NonexistentToken",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "approved",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "droneAddress",
        "type": "address"
      }
    ],
    "name": "DroneRegistered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "trustScore",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "performanceMetric",
        "type": "uint256"
      }
    ],
    "name": "DroneUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Paused",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "taskId",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "droneId",
        "type": "uint256"
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
        "internalType": "bytes32",
        "name": "taskId",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "result",
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
        "internalType": "bytes32",
        "name": "taskId",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "description",
        "type": "string"
      }
    ],
    "name": "TaskCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Unpaused",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "taskId",
        "type": "bytes32"
      }
    ],
    "name": "assignTask",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
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
        "internalType": "string",
        "name": "description",
        "type": "string"
      }
    ],
    "name": "createTask",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
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
    "name": "droneIds",
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
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "drones",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "trustScore",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "performanceMetric",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "lastUpdate",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "active",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
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
    "name": "getDroneCount",
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
        "name": "taskId",
        "type": "bytes32"
      }
    ],
    "name": "getTask",
    "outputs": [
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "taskId",
            "type": "bytes32"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "assignedDroneId",
            "type": "uint256"
          },
          {
            "internalType": "enum QuantumDroneMesh.TaskStatus",
            "name": "status",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "result",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "internalType": "struct QuantumDroneMesh.Task",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
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
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
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
    "name": "paused",
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
        "name": "droneAddress",
        "type": "address"
      }
    ],
    "name": "registerDrone",
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
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "selectDrone",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "selectedDroneId",
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
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "taskId",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "result",
        "type": "uint256"
      }
    ],
    "name": "submitTaskResult",
    "outputs": [],
    "stateMutability": "nonpayable",
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
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "tasks",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "taskId",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "assignedDroneId",
        "type": "uint256"
      },
      {
        "internalType": "enum QuantumDroneMesh.TaskStatus",
        "name": "status",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "result",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "tokenId",
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
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "newTrustScore",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "newPerformance",
        "type": "uint256"
      }
    ],
    "name": "updateDronePerformance",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]`;

const QuantumDroneMesh: React.FC = () => {
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
        Iconoclast Quantum Drone Mesh
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

export default QuantumDroneMesh;
;