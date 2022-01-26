import { useGlobalState } from '../../../GlobalStateProvider';
import { GuestComments } from './GuestComments';
import { UserAdminComments } from './UserAdminComments';

export const Comments = (props: any) => {
    const { state } = useGlobalState();
    
    return (
        <div>
        {
            state.id === 0 ? 
            <GuestComments {...props} /> :
            <UserAdminComments {...props} />
        }
        </div>
    );
}