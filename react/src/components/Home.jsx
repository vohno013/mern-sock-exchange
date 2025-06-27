import Sock from "./Sock";
import Navigator from "./Navigator";

const Home = (props) => {
    return (
        <div>
            <Navigator setPage={props.setPage} page={props.page}/>
            <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {
                    props.data.map((sock) => (
                        <Sock key={sock._id} data={sock} handleDelete={props.handleDelete} />
                    ))
                }
            </div>
        </div>
    );
};

export default Home;