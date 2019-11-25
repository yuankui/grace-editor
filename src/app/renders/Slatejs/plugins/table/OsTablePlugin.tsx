import DeepTable from 'slate-deep-table/dist/index';

export const CommandInsertTable = 'insertTable';

export function createTablePlugin() {
    return DeepTable();
}