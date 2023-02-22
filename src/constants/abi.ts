export const INDEX_TOKEN_FACTORY_CONTRACT_ABI =  [
    {
        "inputs": [
        {
            "internalType": "contract IController",
            "name": "_controller",
            "type": "address"
        }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
        {
            "indexed": true,
            "internalType": "address",
            "name": "_indexToken",
            "type": "address"
        },
        {
            "indexed": false,
            "internalType": "address",
            "name": "_manager",
            "type": "address"
        },
        {
            "indexed": false,
            "internalType": "string",
            "name": "_name",
            "type": "string"
        },
        {
            "indexed": false,
            "internalType": "string",
            "name": "_symbol",
            "type": "string"
        }
        ],
        "name": "IndexTokenCreated",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "controller",
        "outputs": [
        {
            "internalType": "contract IController",
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
            "internalType": "address[]",
            "name": "_components",
            "type": "address[]"
        },
        {
            "internalType": "uint256[]",
            "name": "_units",
            "type": "uint256[]"
        },
        {
            "internalType": "uint256[]",
            "name": "_strategicUnit",
            "type": "uint256[]"
        },
        {
            "internalType": "address",
            "name": "_manager",
            "type": "address"
        },
        {
            "internalType": "string",
            "name": "_name",
            "type": "string"
        },
        {
            "internalType": "string",
            "name": "_symbol",
            "type": "string"
        }
        ],
        "name": "createIndexToken",
        "outputs": [
        {
            "internalType": "address",
            "name": "",
            "type": "address"
        }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getIndexs",
        "outputs": [
        {
            "internalType": "address[]",
            "name": "",
            "type": "address[]"
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
        "name": "indexTokens",
        "outputs": [
        {
            "internalType": "address",
            "name": "",
            "type": "address"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    }
    ] as const


export const INDEX_TOKEN_CONTRACT_ABI = [
    {
        "inputs": [
        {
            "internalType": "address[]",
            "name": "_components",
            "type": "address[]"
        },
        {
            "internalType": "uint256[]",
            "name": "_units",
            "type": "uint256[]"
        },
        {
            "internalType": "uint256[]",
            "name": "_strategicUnit",
            "type": "uint256[]"
        },
        {
            "internalType": "address",
            "name": "_manager",
            "type": "address"
        },
        {
            "internalType": "string",
            "name": "_name",
            "type": "string"
        },
        {
            "internalType": "string",
            "name": "_symbol",
            "type": "string"
        },
        {
            "internalType": "address",
            "name": "_controller",
            "type": "address"
        }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
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
            "name": "spender",
            "type": "address"
        },
        {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
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
            "name": "_component",
            "type": "address"
        }
        ],
        "name": "ComponentAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
        {
            "indexed": true,
            "internalType": "address",
            "name": "_component",
            "type": "address"
        }
        ],
        "name": "ComponentRemoved",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
        {
            "indexed": true,
            "internalType": "address",
            "name": "_target",
            "type": "address"
        },
        {
            "indexed": true,
            "internalType": "uint256",
            "name": "_value",
            "type": "uint256"
        },
        {
            "indexed": false,
            "internalType": "bytes",
            "name": "_data",
            "type": "bytes"
        },
        {
            "indexed": false,
            "internalType": "bytes",
            "name": "_returnValue",
            "type": "bytes"
        }
        ],
        "name": "Invoked",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
        {
            "indexed": false,
            "internalType": "bool",
            "name": "_isLock",
            "type": "bool"
        }
        ],
        "name": "LockEdited",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
        {
            "indexed": false,
            "internalType": "address",
            "name": "_newManager",
            "type": "address"
        },
        {
            "indexed": false,
            "internalType": "address",
            "name": "_oldManager",
            "type": "address"
        }
        ],
        "name": "ManagerEdited",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
        {
            "indexed": false,
            "internalType": "address",
            "name": "_component",
            "type": "address"
        },
        {
            "indexed": false,
            "internalType": "uint256",
            "name": "_unit",
            "type": "uint256"
        }
        ],
        "name": "PositionUnitEdited",
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
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
        }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [
        {
            "internalType": "address",
            "name": "_component",
            "type": "address"
        }
        ],
        "name": "addComponent",
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
        },
        {
            "internalType": "address",
            "name": "spender",
            "type": "address"
        }
        ],
        "name": "allowance",
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
            "name": "spender",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
        }
        ],
        "name": "approve",
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
            "internalType": "address",
            "name": "account",
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
            "internalType": "address",
            "name": "_account",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "_quantity",
            "type": "uint256"
        }
        ],
        "name": "burn",
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
        "name": "components",
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
        "name": "controller",
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
        "name": "decimals",
        "outputs": [
        {
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "address",
            "name": "spender",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "subtractedValue",
            "type": "uint256"
        }
        ],
        "name": "decreaseAllowance",
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
            "internalType": "address",
            "name": "_component",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "_uit",
            "type": "uint256"
        }
        ],
        "name": "editDefaultPositionUnit",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getComponents",
        "outputs": [
        {
            "internalType": "address[]",
            "name": "",
            "type": "address[]"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "uint256",
            "name": "_amount",
            "type": "uint256"
        }
        ],
        "name": "getComponentsForIndex",
        "outputs": [
        {
            "internalType": "address[]",
            "name": "",
            "type": "address[]"
        },
        {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "address",
            "name": "_component",
            "type": "address"
        }
        ],
        "name": "getPositionStrategicUnit",
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
            "name": "_component",
            "type": "address"
        }
        ],
        "name": "getPositionUnit",
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
        "inputs": [],
        "name": "getPositions",
        "outputs": [
        {
            "components": [
            {
                "internalType": "address",
                "name": "component",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "unit",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "strategicUnit",
                "type": "uint256"
            }
            ],
            "internalType": "struct IIndexToken.Position[]",
            "name": "",
            "type": "tuple[]"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "address",
            "name": "spender",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "addedValue",
            "type": "uint256"
        }
        ],
        "name": "increaseAllowance",
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
            "internalType": "address",
            "name": "_component",
            "type": "address"
        }
        ],
        "name": "isComponent",
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
        "name": "isLocked",
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
        "name": "lock",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "manager",
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
            "name": "_account",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "_quantity",
            "type": "uint256"
        }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "nonpayable",
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
        "inputs": [],
        "name": "positionMultiplier",
        "outputs": [
        {
            "internalType": "int256",
            "name": "",
            "type": "int256"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "address",
            "name": "_component",
            "type": "address"
        }
        ],
        "name": "removeComponent",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "address",
            "name": "_manager",
            "type": "address"
        }
        ],
        "name": "setManager",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "startBlock",
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
        "inputs": [],
        "name": "totalSupply",
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
            "name": "to",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
        }
        ],
        "name": "transfer",
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
            "name": "amount",
            "type": "uint256"
        }
        ],
        "name": "transferFrom",
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
        "name": "unlock",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
    ] as const

export const CONTROLLER_CONTRACT_ABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
        {
            "indexed": false,
            "internalType": "address",
            "name": "_admin",
            "type": "address"
        },
        {
            "indexed": false,
            "internalType": "address",
            "name": "_oldAdmin",
            "type": "address"
        }
        ],
        "name": "AdminEdited",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
        {
            "indexed": false,
            "internalType": "address",
            "name": "_indexToken",
            "type": "address"
        },
        {
            "indexed": false,
            "internalType": "int256",
            "name": "_quantity",
            "type": "int256"
        },
        {
            "indexed": false,
            "internalType": "int256",
            "name": "_cost",
            "type": "int256"
        }
        ],
        "name": "IssueIndexToken",
        "type": "event"
    },
    {
        "inputs": [
        {
            "internalType": "address",
            "name": "_indexToken",
            "type": "address"
        }
        ],
        "name": "addIndex",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "admin",
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
            "name": "_indexToken",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "_indexTokenAmount",
            "type": "uint256"
        },
        {
            "internalType": "address",
            "name": "_tokenIn",
            "type": "address"
        }
        ],
        "name": "getAmountInForIndexToken",
        "outputs": [
        {
            "internalType": "uint256",
            "name": "tokenInAmount",
            "type": "uint256"
        },
        {
            "internalType": "address[]",
            "name": "tokenOuts",
            "type": "address[]"
        },
        {
            "internalType": "uint256[]",
            "name": "amountOuts",
            "type": "uint256[]"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "indexTokenFactory",
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
            "name": "_indexTokenFactory",
            "type": "address"
        },
        {
            "internalType": "contract IMultiAssetSwapper",
            "name": "_multiAssetSwaper",
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
            "internalType": "address",
            "name": "_indexToken",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "_indexTokenAmount",
            "type": "uint256"
        },
        {
            "internalType": "address",
            "name": "_tokenIn",
            "type": "address"
        },
        {
            "internalType": "address",
            "name": "_to",
            "type": "address"
        }
        ],
        "name": "issueIndexToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "multiAssetSwaper",
        "outputs": [
        {
            "internalType": "contract IMultiAssetSwapper",
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
            "name": "_indexToken",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "_indexTokenAmount",
            "type": "uint256"
        },
        {
            "internalType": "address",
            "name": "_tokenOut",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "_minAmountOut",
            "type": "uint256"
        },
        {
            "internalType": "address",
            "name": "_to",
            "type": "address"
        }
        ],
        "name": "redeemIndexToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
        {
            "internalType": "address",
            "name": "_admin",
            "type": "address"
        }
        ],
        "name": "setAdmin",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
    ] as const