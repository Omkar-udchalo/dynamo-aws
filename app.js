const AWS = require("aws-sdk");
// const { json } = require("body-parser");
var fs = require("fs");
const ID = "AKIAS4J3CSKBHYMVIFV2";
const SECRET = "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";
AWS.config.update({
    accessKeyId: ID,
    secretAccessKey: SECRET,
    region: "ap-south-1",
    // endpoint: "http://localhost:3000",
});
// const docClient = new AWS.DynamoDB({
//     accessKeyId: ID,
//     secretAccessKey: SECRET,
// }).DocumentClient();

var docClient = new AWS.DynamoDB.DocumentClient();

var data = [
    // { task: "Get Up", progress: "progress" },
    { task: "Work out", progress: "progress" },
    { task: "Complete aws", progress: "progress" },
    { task: "Complete Node", progress: "progress" },
];
for (let item of data) {
    var params = {
        TableName: "om-todo",
        Item: { task: item.task, progress: item.progress },
    };
    docClient.put(params, function(err, data) {
        if (err) {
            console.log(err);
            console.log("error in data add");
        } else {
            console.log("added data");
        }
    });
}

// Getting Task
var params = {
    TableName: "om-todo",
    Key: { task: "Get Up" },
};

docClient.get(params, function(err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});

// Update task

var params = {
    TableName: "om-todo",
    Key: { task: "Work out" },
    UpdateExpression: "set progress=:p",
    ExpressionAttributeValues: {
        ":p": "done",
    },
    ReturnValues: "UPDATED_NEW",
};

docClient.update(params, function(err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log("Updated..");
        console.log(JSON.stringify(data));
    }
});

// Del data
var params = {
    TableName: "om-todo",
    Key: { task: "Work out" },
};

docClient.delete(params, function(err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log("Deleted...");
        console.log(data);
    }
});

//Query db
var params = {
    TableName: "om-todo",
};

let allData = docClient.scan(params).promise();
allData
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });