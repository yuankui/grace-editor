import {HintAction} from "./index";
import React, {ReactNode, useState} from "react";
import {Editor} from "slate";
import {Input, Modal} from "antd";
import {CommandInsertTable} from "../../table/OsTablePlugin";

interface Props {
    hide: () => void,
    editor: Editor,
}

const TableConfirm = (props: Props) => {
    const {editor, hide} = props;
    const [row, setRow] = useState('');
    const [column, setColumn] = useState('');

    const onOk = () => {
        editor.command(CommandInsertTable, column, row);
        hide();
    };

    return <Modal visible={true} onOk={onOk} onCancel={hide}>
        <Input onPressEnter={onOk}
               autoFocus={true}
               placeholder='row size'
               value={row}
               onChange={e => setRow(e.target.value)}/>

        <Input placeholder='column size'
               onPressEnter={onOk}
               value={column}
               onChange={e => setColumn(e.target.value)}/>
    </Modal>;
};


export default class TableAction implements HintAction {
    modal(editor: Editor, hide: () => void): ReactNode {
        return <TableConfirm editor={editor} hide={hide}/>
    }

    icon(width: number): ReactNode {
        // https://icons8.com/icons/set/todo
        return <img width={width} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAD4UlEQVR4nO2dS2sUQRRGT6IhiAbxCYqPja+tGk1ExMdCEbeC/8A/IQquJS7yBwQXvlaughoVowkqPkkWQaOCRvfiQldOXNREJ9U12tXd097p+Q7Uooaue4s6/ZruywwIIYQQQgghhBCiPTkBfAbm1KLaLHA87SJ3pd2wHnhDxPbiD7PApjQbxgiZyzYXUSfVWne3ehYijsU5xsYcXa3EP3KtzisVOkKMISHGkBBjSIgxJMQYEmIMCTGGhBhDQowhIcaQEGNIiDEkxBgSYgwJMYaEGENCjCEhxpAQY0iIMSTEGKrLKg/VZbUjEmIMCTGGKhdbhyoXq4CEGENCjCEhxpAQY0iIMSTEGBJiDAkxhoQYQ0KMISHGkBBjSIgxJMQYEmIMCTGGhBhDQowhIcaQEGOocrE8VLnYjkiIMSSkPApfa//3aK3Q6nn1A08DeWLbC2B/kRPrNCE9wDBQC+TI2mrAEPlKeH/TSULWAGOB2POL+gw4AxwEtgNL621L/bPzwBOay3wArMw7yU4RsgJ4HYhbA67iFj0tW4DLwM9AvOfA8jwT7QQhvcDjQMy3wO4ccfvrMfy447hTYyY6QcjFQLxR3FGTlz7gViD+hawBqy7kCMlz/ig59uAAvcCIl6MGHMoSrMpCunC3pY1xPgCri5igRx8w7eV6RYbvKVUWcorkXtvfwvz9JC/0JyPmmzlxGRQxr/tejCsl5L/kjbsTMTZX4laTd16bWLi31oCtJeTfzsJr1k9go55lub8jalyHF8BMCXnfABMN/W7gmITAoNe/WWLuEa8/ICGw0+uPl5j7sdffVchDrjZnrdf/0mS7tNeHZtuF3hi+/8dc/pmoihf1H974ZSnzxLYQS7xtvuuU9X9/+cF/CtAtIfDV668vMfc6r/9NQtyfPjbiL9I8XU1a1u0gKf+ThMCU1z9QYm4/13TM4LwXtXZpz2IWJTA+hpfe2NN5Ele1lfXoZBsLH53UgM0R45kNJK9quxaxLlmF3PDGjUWMBdwzn06RUgP2pFyXLEIGSL4Mi378XmW6cdeOxgWaoYDKkACrgHderklUtJhgkORee5diX+H2kHz3UsOVDokAQyRPQXcp5khZBdwLxB8uIHZlWYwrYvMXbQbYmyPuAMnT1BzufUhvjrgdwUpcEVvoQn+duFvibbi7qVAF4xStuUZVkuW49yLN7sCeA2eBw8AO/pSS7qh/dg735rFZKekEkhFND66Irehi62F0msrFIZK3xFnaJLqbKowu3Be3UcKF0387Ih7Wx6b6nmHlZ7nbiY3AUWAf7n38Wtwt7SLgG/AR99T2EXC73k/NL7wwBvONdicYAAAAAElFTkSuQmCC"/>;
    }
    subtitle(): string {
        return "Insert table";
    }

    title(): string {
        return "Table";
    }

    key: string = this.title();
}