import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../store/hooks'
import { userLogout } from '../store/slices/userSlice'
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Button } from './Button';

const DeleteUser = ({ userId }: { userId: string }) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    async function deleteUser() {
        await axios.delete(`http://localhost:5000/api/users/${userId}`)
        dispatch(userLogout())
        navigate('/')
    }
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
                <button className="text-red-500">
                    Delete account
                </button>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="bg-black/50 data-[state=open]:animate-overlayShow fixed inset-0" />
                <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] dark:bg-red-900  p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                        Are you absolutely sure?
                    </AlertDialog.Title>
                    <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
                        This action cannot be undone. This will permanently delete your account and remove your
                        data from our servers.
                    </AlertDialog.Description>
                    <div className="flex justify-end gap-[25px]">
                        <AlertDialog.Cancel asChild>
                            <Button variant="default"  >
                                Cancel
                            </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action asChild>
                            <Button variant="default" onClick={deleteUser} >
                                Yes, delete account
                            </Button>
                        </AlertDialog.Action>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root >
    )
}

export default DeleteUser