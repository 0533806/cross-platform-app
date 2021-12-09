import 'package:flutter/material.dart';
import 'package:math_expressions/math_expressions.dart';

void main() {
  runApp(Calculator());
}

class Calculator extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Calculator',
      debugShowCheckedModeBanner: false,
      home: SimpleCalculator(),
    );
  }
}

class SimpleCalculator extends StatefulWidget {
  @override
  _SimpleCalculatorState createState() => _SimpleCalculatorState();
}

class _SimpleCalculatorState extends State<SimpleCalculator> {
  String result = "";
  var previousOperand = false;
  var komma = false;

  toNull() {
    setState(() {
      result = "";
      komma = false;
      previousOperand = false;
    });
  }

  buttonPressed(String buttonText) {
    setState(() {
      if (buttonText == ".") {
        if (result.endsWith('+') ||
            result.endsWith('-') ||
            result.endsWith('*') ||
            result.endsWith('%') ||
            result == "") return;
        if (komma) return;
        komma = true;
      }
      if (result == "0" && buttonText == "0" && komma == false) return;
      if (result == "") {
        if (['+', '*', '%'].indexOf(buttonText) == -1) result = buttonText;
        if ("-".indexOf(buttonText) == 1) {
          previousOperand = true;
          komma = false;
        }
        return;
      }
      if (['+', '-', '*', '%'].indexOf(buttonText) != -1) {
        if (buttonText == '-') {
          if (result.endsWith('*') || result.endsWith('%')) {
            result = result + buttonText;
            return;
          }
        }
        if (previousOperand == false) result = result + buttonText;
        previousOperand = true;
        komma = false;
        return;
      }

      previousOperand = false;
      if (result == "0" && buttonText == ".")
        result = result + buttonText;
      else if (result == "0")
        result = buttonText;
      else
        result = result + buttonText;
    });
  }

  counting() {
    setState(() {
      var stack = [];
      String operation = '+';
      var test = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
      String output = "";

      var nega = false;
      if(result[0]=="-") result = "0" + result;
      for (int i = 0; i < result.length; i++) {
        var current = result[i];
        if ( test.indexOf(current) != -1) output = output + current;
        if (test.indexOf(current) == -1 || i == result.length - 1) {
          double value = double.parse(output);
          if (operation == '-')
            stack.add(-value);
          else if (operation == '+')
            stack.add(value);
          else if (operation == '*')
            stack.add(stack.removeLast() * value);
          else if (operation == '%') stack.add(stack.removeLast() / value);
          output = "";
          operation = current;
          if (i != result.length - 1) {
            if (result[i + 1] == "-") {
              i++;
              nega = true;
              continue;
            }
          }
          if (nega) {
            nega = false;
            stack.add(-stack.removeLast());
          }
        }
      }
      double sum = stack.reduce((value, element) => value + element);    
      RegExp regex = RegExp(r"([.]*0)(?!.*\d)");
      result = sum.toString().replaceAll((regex), "");
    });
  }

  slice() {
    setState(() {
      if (result == "") return;
      if (result.endsWith('.')) komma = false;
      if (result.endsWith('+') ||
          result.endsWith('-') ||
          result.endsWith('*') ||
          result.endsWith('%')) previousOperand = false;
      result = result.substring(0, result.length - 1);
      if (result.endsWith('*') || result.endsWith('%')) previousOperand = true;
    });
  }

  Widget buildButton(String buttonText, double buttonSize) {
    return Container(
      color: null,
      child: TextButton(
          onPressed: () => buttonPressed(buttonText),
          child: Text(
            buttonText,
            style: TextStyle(
                fontSize: buttonSize,
                fontWeight: FontWeight.normal,
                color: Colors.black),
          )),
    );
  }

  @override
  Widget build(BuildContext context) {
    double screenHeight = MediaQuery.of(context).size.height;
    double screenWidth = MediaQuery.of(context).size.width;
    double fit = 0; //if numbers not fix with the circle, try edit this value
    double unit = screenWidth / 2;
    int corner = 25; //correction for 1, 6, 9
    double clock = screenWidth / 2 - 30; // distance from center to circle

    return Scaffold(
        body: Stack(children: [
      Positioned(
          bottom: 0,
          child: Container(
              height: screenHeight / 2,
              width: screenWidth / 2,
              color: Colors.teal)),
      Positioned(
          bottom: 0,
          left: screenWidth / 2,
          child: Container(
              height: screenHeight / 2,
              width: screenWidth / 2,
              color: Colors.pink)),
      Positioned(
          bottom: screenHeight / 2,
          child: Container(
              height: screenHeight / 2,
              width: screenWidth / 2,
              color: Colors.pink)),
      Positioned(
          bottom: screenHeight / 2,
          left: screenWidth / 2,
          child: Container(
              height: screenHeight / 2,
              width: screenWidth / 2,
              color: Colors.teal)),
      Positioned(
          top: screenHeight / 4,
          child: Container(
              width: screenWidth,
              height: screenWidth,
              decoration: new BoxDecoration(
                color: Colors.white,
                shape: BoxShape.circle,
              ) //decoration
              ) //container
          ),
      Positioned(
          top: screenHeight / 4 + 50,
          left: 50,
          child: Container(
              width: screenWidth - 100,
              height: screenWidth - 100,
              decoration: new BoxDecoration(
                color: Colors.yellow,
                shape: BoxShape.circle,
              ) //decoration
              ) //container
          ),
      //numbers
      Positioned(
          bottom: screenHeight / 2 - fit + unit - corner,
          left: clock,
          child: buildButton("1", 20)),
      Positioned(
          bottom: screenHeight / 2 - fit + unit * 0.75,
          left: clock + unit * 0.25 * 1.73,
          child: buildButton("2", 20)),
      Positioned(
          bottom: screenHeight / 2 - fit + unit * 0.25 * 1.73,
          left: clock + unit * 0.75,
          child: buildButton("3", 20)),
      Positioned(
          bottom: screenHeight / 2 - fit - unit * 0.25 * 1.73,
          left: clock + unit * 0.75,
          child: buildButton("4", 20)),
      Positioned(
          bottom: screenHeight / 2 - fit - unit * 0.75,
          left: clock + unit * 0.25 * 1.73,
          child: buildButton("5", 20)),
      Positioned(
          bottom: screenHeight / 2 - fit - unit + corner,
          left: clock,
          child: buildButton("6", 20)),
      Positioned(
          bottom: screenHeight / 2 - fit - unit * 0.75,
          left: clock - unit * 0.25 * 1.73,
          child: buildButton("7", 20)),
      Positioned(
          bottom: screenHeight / 2 - fit - unit * 0.25 * 1.73,
          left: clock - unit * 0.75,
          child: buildButton("8", 20)),
      Positioned(
          bottom: screenHeight / 2 - fit,
          left: clock - unit + corner,
          child: buildButton("9", 20)),
      Positioned(
          bottom: screenHeight / 2 - fit + unit * 0.25 * 1.73,
          left: clock - unit * 0.75,
          child: buildButton(".", 20)),
      Positioned(
          bottom: screenHeight / 2 - fit + unit * 0.75,
          left: clock - unit * 0.25 * 1.73,
          child: buildButton("0", 20)),
      //operations
      Positioned(
          top: screenHeight / 8,
          left: screenWidth / 8,
          child: buildButton("+", 30)),
      Positioned(
          top: screenHeight / 8,
          right: screenWidth / 8,
          child: buildButton("-", 30)),
      Positioned(
          bottom: screenHeight / 8,
          left: screenWidth / 8,
          child: buildButton("*", 30)),
      Positioned(
          bottom: screenHeight / 8,
          right: screenWidth / 8,
          child: buildButton("%", 30)),
      //icons
      Positioned(
          bottom: screenHeight / 2 - fit + unit - corner - 60,
          left: clock,
          child: IconButton(icon: Icon(Icons.delete), onPressed: toNull)),
      Positioned(
          bottom: screenHeight / 2 - fit - unit + corner + 60,
          left: clock,
          child: IconButton(icon: Icon(Icons.calculate), onPressed: counting)),
      Positioned(
          bottom: screenHeight / 2 - fit,
          left: clock - unit + corner + 60,
          child: IconButton(icon: Icon(Icons.backspace), onPressed: slice)),
      Positioned(
        bottom: screenHeight / 2 - fit + 5,
        left: screenWidth / 2.5 - fit,
        child: ConstrainedBox(
          constraints: BoxConstraints(
              minWidth: screenWidth / 8 * 5, maxWidth: screenWidth / 8 * 5),
          child: Container(
              color: Colors.brown,
              child: Text(result,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                      fontSize: 26.0,
                      fontWeight: FontWeight.normal,
                      color: Colors.white))),
        ),
      ),
    ])
        );
  }
}
