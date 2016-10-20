import React, {Component} from 'react';
import {AgGridReact} from 'ag-grid-react';
import NameCellEditor from './NameCellEditor.jsx';
import DateCellEditor from './DateCellEditor.jsx';

const data = [
  [134, 12, 'Felix the Cat', '2016/10/20'],
  [245, 16, 'Garfield', '2016/10/20']
]
const data2 = [
  {NAME: 'Felix'},
  {NAME: 'Garfield'},
]

function valueGetter(params) {
  return params.data[params.colDef.index];
}

const columnInfo = [
  {
    index: 0,
    id: 'ID',
    name: 'Id',
    valueGetter,
  },
  {
    index: 1,
    id: 'AGE',
    name: 'Age',
    valueGetter,
  },
  {
    id: 'NAME',
    index: 2,
    name: 'Full Name',
    valueGetter,
  },
  {
    id: 'SOME_DATE',
    index: 3,
    name: 'Some date',
    valueGetter,
    type: 'date',
  }
];

function getColDefs() {
  return columnInfo.map(ci => ({
    headerName: ci.name,
    field: ci.id,
    width: 120,
    valueGetter: ci.valueGetter,
    index: ci.index,
    editable: true,
    cellEditorFramework: ci.type === 'date' ? DateCellEditor : NameCellEditor,
    newValueHandler
  }));
}

function newValueHandler(params) {
    console.log('newValue=', params.newValue);
    const arrData = params.data;
    arrData[params.colDef.index] = params.newValue;
    params.api.refreshCells([params.node], [params.colDef.field]);
}

const colDefs = getColDefs();
console.log('colDefs=', colDefs);
class ReSimple extends Component {
  render() {
    return (
      <div>
        <AgGridReact

            // column definitions and row data are immutable, the grid
            // will update when these lists change
            columnDefs={getColDefs()}
            rowData={data}

            // or provide props the old way with no binding
            rowSelection="multiple"
            enableSorting="true"
            enableFilter="true"
            rowHeight="22"
        />
      </div>
    );
  }
}

export default ReSimple;