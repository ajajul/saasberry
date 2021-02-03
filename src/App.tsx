import React from 'react';
import axios from 'axios';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';
import { DataGrid } from '@material-ui/data-grid';

import './App.css';

function App() {

  const [data, setData] = React.useState([] as any)
  const [pageNumber, setPageNumber] = React.useState(1);
  const [fetchData, setFetchData] = React.useState(true as boolean)

  const columns = [
    {
      field: 'firstName',
      headerName: 'FirstName',
      width: 150,
      renderCell: (params: any) => (
        <span>{params.getValue('firstName') ? params.getValue('firstName') : '-'} </span>)
    },
    {
      field: 'lastName',
      headerName: 'LastName',
      width: 150,
      renderCell: (params: any) => (
        <span>{params.getValue('lastName') ? params.getValue('lastName') : '-'} </span>)
    },
    {
      field: 'mobile',
      headerName: 'Mobile',
      width: 150,
      renderCell: (params: any) => (
        <span>{params.getValue('mobile') ? params.getValue('mobile') : '-'} </span>)
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 150,
      renderCell: (params: any) => (
        <span>{params.getValue('email') ? params.getValue('email') : '-'} </span>)
    },
    {
      field: 'address1',
      headerName: 'Address 1',
      width: 150,
      renderCell: (params: any) => (
        <span>{params.getValue('address1') ? params.getValue('address1') : '-'} </span>)
    },
    {
      field: 'address2',
      headerName: 'Address 2',
      width: 150,
      renderCell: (params: any) => (
        <span>{params.getValue('address2') ? params.getValue('address2') : '-'} </span>)
    },
    {
      field: 'city',
      headerName: 'City',
      width: 10,
      renderCell: (params: any) => (
        <span>{params.getValue('city') ? params.getValue('city') : '-'} </span>)
    },
    {
      field: 'postalCode',
      headerName: 'PostalCode',
      width: 150,
      renderCell: (params: any) => (
        <span>{params.getValue('postalCode') ? params.getValue('postalCode') : '-'} </span>)
    },
    {
      field: 'country',
      headerName: 'Country',
      width: 150,
      renderCell: (params: any) => (
        <span>{params.getValue('country') ? params.getValue('country') : '-'} </span>)
    },
    {
      field: 'startDate',
      headerName: 'startDate',
      width: 150,
      renderCell: (params: any) => (
        <span>{params.getValue('StartDate') ? moment(params.getValue('startDate')).format('MM DD/YYYY') : '-'} </span>)
    }
  ];

  const getAccountData = () => {
    console.log("Test")
    const reqData = {
      "startDateUTC": "2020-02-02T04:10:24.794Z",
      "endDateUTC": "2021-02-02T04:10:24.794Z",
      "fromDate": "2020-02-02T04:10:24.794Z",
      "toDate": "2021-02-02T04:10:24.794Z",
      "locationId": 1,
      "clientUTCDate": "2021-02-02T04:10:24.794Z",
      "searchText": null,
      "pageNumber": pageNumber,
      "pageSize": 10
    }
    axios.post('https://wrkoutapiqa.azurewebsites.net/api/Accounts/GetClientAccounts', reqData)
      .then((res: any) => {
        console.log(res);
        setData([...data, ...res.data]);
        setPageNumber(pageNumber + 1);
      })
      .catch(err => {
        console.log(err)
        setFetchData(false);
      })
  }

  React.useEffect(() => {
    if (data.length <= 0 && fetchData) {
      getAccountData();
    }
  }, [])

  return (
    <div className="App" id='grid-item'>
      <div>
        <InfiniteScroll
          dataLength={data.length}
          next={getAccountData}
          hasMore={true}
          loader={''}
          height={600}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="data-table">
            <DataGrid
              paginationMode={'server'}
              autoHeight={true}
              hideFooterPagination={true}
              rows={data}
              columns={columns}
              disableSelectionOnClick
            />
          </div>
        </InfiniteScroll>
      </div>

    </div>
  );
}

export default App;
