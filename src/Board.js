import React from 'react';
import Dragula from 'dragula';
import 'dragula/dist/dragula.css';
import Swimlane from './Swimlane';
import './Board.css';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    const clients = this.getClients();
    this.state = {
      clients: {
        backlog: clients,
        inProgress:[] ,
        complete: [],
        //clients.filter(client => client.status && client.status === 'complete'),
        //clients.filter(client => client.status && client.status === 'in-progress')
      }
    }
    this.swimlanes = {
      backlog: React.createRef(),
      inProgress: React.createRef(),
      complete: React.createRef(),
    }
  }


  componentDidMount() {
    // Initialize Dragula with references to the swimlanes
    this.dragula = Dragula([
      this.swimlanes.backlog.current,
      this.swimlanes.inProgress.current,
      this.swimlanes.complete.current
    ]);
  
    // Set up event listeners for Dragula
    this.dragula.on('drop', (el, target, source, sibling) => {
      const clientId = el.dataset.id;
      const newStatus = target.id.toLowerCase().replace(' ', ''); // Normalize new status
  
      // Check if newStatus is valid before updating
      if (['backlog', 'inprogress', 'complete'].includes(newStatus)) {
        this.updateClientStatus(clientId, newStatus);
      } else {
        console.error(`Invalid status: ${newStatus}`);
      }
    });
  }
  
  updateClientStatus(clientId, newStatus) {
    this.setState((prevState) => {
      const clients = { ...prevState.clients };
      let movedClient;
  
      // Remove the client from the previous swimlane
      Object.keys(clients).forEach((key) => {
        clients[key] = clients[key].filter((client) => {
          if (client.id === clientId) {
            movedClient = { ...client, status: newStatus };
            return false;
          }
          return true;
        });
      });
  
      // Ensure newStatus is one of the keys in clients
      if (movedClient && clients[newStatus]) {
        clients[newStatus].push(movedClient);
      }
  
      return { clients };
    });
  }
  


  getClients() {
    return [
      ['1','Stark, White and Abbott','Cloned Optimal Architecture', 'in-progress'],
      ['2','Wiza LLC','Exclusive Bandwidth-Monitored Implementation', 'complete'],
      ['3','Nolan LLC','Vision-Oriented 4Thgeneration Graphicaluserinterface', 'backlog'],
      ['4','Thompson PLC','Streamlined Regional Knowledgeuser', 'in-progress'],
      ['5','Walker-Williamson','Team-Oriented 6Thgeneration Matrix', 'in-progress'],
      ['6','Boehm and Sons','Automated Systematic Paradigm', 'backlog'],
      ['7','Runolfsson, Hegmann and Block','Integrated Transitional Strategy', 'backlog'],
      ['8','Schumm-Labadie','Operative Heuristic Challenge', 'backlog'],
      ['9','Kohler Group','Re-Contextualized Multi-Tasking Attitude', 'backlog'],
      ['10','Romaguera Inc','Managed Foreground Toolset', 'backlog'],
      ['11','Reilly-King','Future-Proofed Interactive Toolset', 'complete'],
      ['12','Emard, Champlin and Runolfsdottir','Devolved Needs-Based Capability', 'backlog'],
      ['13','Fritsch, Cronin and Wolff','Open-Source 3Rdgeneration Website', 'complete'],
      ['14','Borer LLC','Profit-Focused Incremental Orchestration', 'backlog'],
      ['15','Emmerich-Ankunding','User-Centric Stable Extranet', 'in-progress'],
      ['16','Willms-Abbott','Progressive Bandwidth-Monitored Access', 'in-progress'],
      ['17','Brekke PLC','Intuitive User-Facing Customerloyalty', 'complete'],
      ['18','Bins, Toy and Klocko','Integrated Assymetric Software', 'backlog'],
      ['19','Hodkiewicz-Hayes','Programmable Systematic Securedline', 'backlog'],
      ['20','Murphy, Lang and Ferry','Organized Explicit Access', 'backlog'],
    ].map(companyDetails => ({
      id: companyDetails[0],
      name: companyDetails[1],
      description: companyDetails[2],
      status: companyDetails[3],
    }));
  }
  renderSwimlane(name, clients, ref) {
    return (
      <Swimlane name={name} clients={clients} dragulaRef={ref}/>
    );
  }

  render() {
    return (
      <div className="Board">
        <div className="container-fluid">
          <div className="row">
            <div className="Swimlane-column" id="backlog">
              {this.renderSwimlane('Backlog', this.state.clients.backlog, this.swimlanes.backlog)}
            </div>
            <div className="Swimlane-column" id="in-progress">
              {this.renderSwimlane('In Progress', this.state.clients.inProgress, this.swimlanes.inProgress)}
            </div>
            <div className="Swimlane-column" id="complete">
              {this.renderSwimlane('Complete', this.state.clients.complete, this.swimlanes.complete)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
