import React ,{ useState , useEffect } from "react";
import { getCountries, getPeople} from './DataApi';
import {
    Row , Col , List , Select , Input , InputNumber, Spin , Tabs
} from  'antd'
const {Option} = Select
const { TabPane } = Tabs;


const App: React.FunctionComponent = () => {
    const [countries, setCountries] = useState<any>([]);
    const [people, setPeople] = useState<any>([]);
    const [spinning, setSpinning] = useState<boolean>(false);

    useEffect(()=>{
        searchPeople()
        searchCountries()
    } , [])

    const searchCountries = async (search?: string) => {
        setSpinning(true)
        await getCountries({ search }).then((result)=>{
            setCountries(result.searchResults)
            console.log(result)
        }).finally(()=>{
            setSpinning(false)
        });
    }

    const searchPeople = async (search?: string) => {
        await getPeople({ search }).then((result)=>{
            setPeople(result)
            console.log(result)
        }).finally(()=>{
            setSpinning(false)
        });
    }




  return (
    <div className="pageWrapper">
      <p>Search Component</p>
        <Tabs defaultActiveKey="1" >
            <TabPane tab="Search by name" key="1">
                <Input
                    onKeyUp={(e:any)=>{
                        console.log(e.target.value)
                        searchPeople(e ?  e.target.value : null)
                    }}
                    onPaste={
                        (e:any)=>{
                            searchPeople(e.target.value)
                        }
                    }
                    placeholder={'Name'}/>
            </TabPane>
            <TabPane tab="Search by country" key="2">
                <Select
                    showSearch
                    allowClear
                    onChange={(e:string)=>{
                        searchPeople(e)
                    }}
                    placeholder={'Country'}
                    style={{width:'100%'}}
                    notFoundContent={null}
                    optionFilterProp="children"
                    filterOption={(input:string, option:any) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }

                >
                    <Option  key={-1} value={null}>
                        All
                    </Option>

                    {
                        countries.map((s , i)=>(
                            <Option  key={i} value={s.alpha2Code}>
                                {s.name}
                            </Option>
                        ) )
                    }
                </Select>
            </TabPane>
        </Tabs>


      <p style={{marginTop:'20px'}}>List Component</p>
        <Spin spinning={spinning}>
            <div className="listWrapper">
                <List
                    itemLayout="horizontal"
                    dataSource={people.searchResults}
                    renderItem={(item:any) => (
                        <List.Item>
                            <div className={'flex'} >
                                <div>
                                  <b> Person: </b>   {item.first_name + item.last_name}
                                </div>
                                <div>
                                   <b>City:</b> {item.city}
                                </div>
                                <div>
                                  <b>Country:</b> {item.country}
                                </div>
                            </div>
                        </List.Item>
                    )}
                />
                {/*alpha2Code*/}
            </div>
        </Spin>

      <p style={{marginTop:'20px'}}>Found results: {people.searchResultCount}</p>
      <p>Total results: {people.totalResultCounter}</p>
    </div>
  );
};

export default App;
