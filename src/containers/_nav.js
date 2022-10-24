const _nav =  [
{
  _tag: 'CSidebarNavItem',
  name: 'Painel Geral',
  to: '/dashboard',
  icon: 'cil-speedometer'
},
{
  _tag: 'CSidebarNavTitle',
  _children: ['Opções']
},
{
  _tag: 'CSidebarNavItem',
  name: 'Eventos',
  to: '/wall',
  icon: 'cil-warning'
},
{
  _tag: 'CSidebarNavItem',
  name: 'Resultados',
  to: '/reservations',
  icon: 'cil-calendar'
},
]

export default _nav
