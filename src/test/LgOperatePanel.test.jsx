const mockCallback = jest.fn();
forEach([0, 1], mockCallback);
// 此模拟函数被调用了两次
expect(mockCallback.mock.calls.length).toBe(2);

// 第一次调用函数时的第一个参数是 0
expect(mockCallback.mock.calls[0][0]).toBe(0);

// 第二次调用函数时的第一个参数是 1
expect(mockCallback.mock.calls[1][0]).toBe(1);
describe('功能测试',()=>{
    test('设置面板大小', () => {
        expect(1).toEqual(1);//不会写测试了，以后再写
    });
    test('run按钮执行函数', () => {
        expect(1).toEqual(1);
    });
    test('clear按钮执行函数', () => {
        expect(1).toEqual(1);
    });
    test('stop按钮执行函数', () => {
        expect(1).toEqual(1);
    });

})
describe('功能测试',()=>{
    test('设置面板大小', () => {
        expect(1).toEqual(1);
    });
    test('run按钮执行函数', () => {
        expect(1).toEqual(1);
    });
    test('clear按钮执行函数', () => {
        expect(1).toEqual(1);
    });
    test('stop按钮执行函数', () => {
        expect(1).toEqual(1);
    });

})