import { useRouter } from "next/router";
import {api} from "../../utils/api";

export default function Question() {
  const router = useRouter();
  const {id}  = router.query;
  return (
    <div>
      the id of this page is {id}
    </div>
  )
}
