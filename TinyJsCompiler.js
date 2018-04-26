//Lexical Analyzer
const lex=str=>str.split(' ').map(s => s.trim()).filter(s => s.length);

//Parser - Generate AST
const Op = Symbol('op');
const Num = Symbol('num');

const parse = tokens => {

  let c = 0;

  const peek = () => tokens[c];
  const consume = () => tokens[c++];

  const parseNum = () => ({ val: parseInt(consume()), type: Num });

  const parseOp = () => {
    const node = { val: consume(), type: Op, expr: [] };
    while (peek()) node.expr.push(parseExpr());
    return node;
  };

  const parseExpr = () => /\d/.test(peek()) ? parseNum() : parseOp();

  return parseExpr();
};

//Transpiler
const transpile = ast => {  
    const opMap = { sum: '+', mul: '*', sub: '-', div: '/' };
    const transpileNode = ast => ast.type === Num ? transpileNum(ast) : transpileOp(ast);
    const transpileNum = ast => ast.val;
    const transpileOp = ast => `(${ast.expr.map(transpileNode).join(' ' + opMap[ast.val] + ' ')})`;
    return transpileNode(ast);
  };

  const program = 'mul 3 sub 2 sum 1 3 4';
  console.log(transpile(parse(lex(program))))
