import SideNav, {Toggle, NavItem, NavIcon, NavText}  from '@trendmicro/react-sidenav'
import { useNavigate } from 'react-router-dom';
import "@trendmicro/react-sidenav/dist/react-sidenav.css"

function MySideNav(){
  const navigate = useNavigate();
  return <SideNav
    onSelect={selected =>{
      navigate('/'+selected)
    }}>
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected="home">
        <NavItem eventKey="home">
        <NavIcon><i className='fa fa-fw fa-home'/></NavIcon>
          <NavText>Inicio</NavText>
        </NavItem>
        <NavItem eventKey="criarSorteio">
        <NavIcon><i class="fa-solid fa-plus"></i></NavIcon>
          <NavText>Criar sorteio</NavText>
        </NavItem>
        <NavItem eventKey="aposta">
        <NavIcon><i class="fa-solid fa-pen-to-square"></i></NavIcon>
          <NavText>Apostar</NavText>
        </NavItem>
        <NavItem eventKey="ranking">
        <NavIcon><i class="fa-solid fa-ranking-star"></i></NavIcon>
          <NavText>Ranking</NavText>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
}

export default MySideNav;