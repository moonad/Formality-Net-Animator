function add([ax, ay], [bx, by]) {
    return [ax + bx, ay + by];
}

function rotate([ax, ay], angle) {
    return [
        Math.cos(angle) * ax - Math.sin(angle) * ay, 
        Math.sin(angle) * ax + Math.cos(angle) * ay];
}

function getRadianFromAngle(angle = 270) {
    return angle * Math.PI / 180;
}

class Node {
    constructor(type, position, angle) {
        this.type = type; // 0: white node, 1: black node
        this.position = position;
        this.angle = angle; // angle for port 0? 
        this.ports = [null, null, null]; // [[node0, 0], [node1, 1], [node2, 2]]
        this.radios = 20;
    }

    getPortsPosition(slot) {
        // var add_angle = [0, Math.PI * 2 / 3, Math.PI * 4 / 3][slot];
        var add_angle = [0, getRadianFromAngle(120), getRadianFromAngle(240)][slot];
        var position = add([this.position.x, this.position.y], rotate([this.radios, 0], this.angle + add_angle));
        return {x: position[0], y: position[1]};
    }
    
}

// Auxiliar to render position
const height = 400;
const width = 400;

// Nodes
var nodes = [];

var node0 = new Node(0, {x: width * 0.5, y: height * 0.2}, getRadianFromAngle(90));
nodes.push(node0);

var node1 = new Node(0, {x: width * 0.3, y: height * 0.35}, getRadianFromAngle());
nodes.push(node1);

var node2 = new Node(1, {x: width - (width * 0.3), y: height * 0.35}, getRadianFromAngle());
nodes.push(node2);

var node3 = new Node(0, {x: width * 0.20, y: height * 0.50}, getRadianFromAngle());
nodes.push(node3);

var node4 = new Node(0, {x: width * 0.40, y: height * 0.50}, getRadianFromAngle(90));
nodes.push(node4); 

// var testNode = new Node(0, {x: width * 0.5, y: height * 0.5}, getRadianFromAngle());
// nodes.push(testNode);

window.onload = function(){
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    setInitialNode(context);

    // Calls a function or evaluates an expression at specified intervals
    setInterval(() => {
        for (node of nodes) {     
            drawTriangle(context, node);  
            if (node.type == 1) {
                // console.log("Node type is 1")
                context.strokeStyle = 'blue';
            } else {
                context.strokeStyle = 'black';
            }
        };
    }, 1000/30);
    
}

function setInitialNode(context) {
    context.beginPath();
    context.arc(width * 0.47, height * 0.05, 5, 0, 2 * Math.PI);
    context.stroke();
}

function drawTriangle(context, node) {
    context.beginPath();
    // Port 0 to 1
    context.moveTo(node.getPortsPosition(0).x, node.getPortsPosition(0).y);
    context.lineTo(node.getPortsPosition(1).x, node.getPortsPosition(1).y);
    
    // Port 1 to 2
    context.moveTo(node.getPortsPosition(1).x, node.getPortsPosition(1).y);
    context.lineTo(node.getPortsPosition(2).x, node.getPortsPosition(2).y);

    // Port 2 to 0
    context.moveTo(node.getPortsPosition(2).x, node.getPortsPosition(2).y);
    context.lineTo(node.getPortsPosition(0).x, node.getPortsPosition(0).y);

    context.closePath();
    context.stroke(); 
}