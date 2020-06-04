import useUIStore from "hooks/globalStores/useUIStore";
import useAuthStore from "hooks/globalStores/useAuthStore";
import useCartStore from "hooks/globalStores/useCartStore";
import useRoutingStore from "hooks/globalStores/useRoutingStore";

export default function useStores() {
  const authStore = useAuthStore();
  const cartStore = useCartStore();
  const routingStore = useRoutingStore();
  const uiStore = useUIStore();

  return { uiStore, routingStore, authStore, cartStore };
}
