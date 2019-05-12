import LgEntrance from '../LgEntrance'
const temp=new LgEntrance();
describe('逻辑测试',()=> {

    test('细胞死亡时邻居为1', () => {
        expect(temp.judgeCelllife(false, 1)).toBe(false);
    });
    test('细胞死亡时邻居为2', () => {
        expect(temp.judgeCelllife(false, 2)).toBe(false);
    });
    test('细胞死亡时邻居为3', () => {
        expect(temp.judgeCelllife(false, 3)).toBe(true);
    });
    test('细胞死亡时邻居为4', () => {
        expect(temp.judgeCelllife(false, 4)).toBe(false);
    });
    test('细胞存活时邻居为1', () => {
        expect(temp.judgeCelllife(true, 1)).toBe(false);
    });
    test('细胞存活时邻居为2', () => {
        expect(temp.judgeCelllife(true, 2)).toBe(true);
    });
    test('细胞存活时邻居为3', () => {
        expect(temp.judgeCelllife(true, 3)).toBe(true);
    });
    test('细胞存活时邻居为4', () => {
        expect(temp.judgeCelllife(true, 4)).toBe(false);
    });

})