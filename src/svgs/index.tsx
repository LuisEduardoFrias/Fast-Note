import FontAwesome from '@expo/vector-icons/FontAwesome';

export { AddIcon } from './add_icon'
export { DeleteIcon } from './delete_icon'

export const Menu = (props) =>
  <FontAwesome name='menu' size={24} color='#0000' {...props} />;
  
export const Back = (props) =>
  <FontAwesome name='Back' size={24} color='#0000' {...props} />;