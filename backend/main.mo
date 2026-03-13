import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Map "mo:core/Map";
import Principal "mo:core/Principal";

actor {
  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    imageUrl : Text;
  };

  type CartItem = {
    product : Product;
    quantity : Nat;
  };

  let products = Map.fromArray<Nat, Product>(
    [
      (1, {
        id = 1;
        name = "Natural Red Color";
        description = "Extracted from beets";
        price = 15;
        imageUrl = "red.png";
      }),
      (2, {
        id = 2;
        name = "Natural Yellow Color";
        description = "Extracted from turmeric";
        price = 12;
        imageUrl = "yellow.png";
      }),
      (3, {
        id = 3;
        name = "Natural Blue Color";
        description = "Extracted from blueberries";
        price = 18;
        imageUrl = "blue.png";
      }),
    ]
  );

  let carts = Map.empty<Principal, List.List<CartItem>>();

  public query ({ caller }) func getProduct(id : Nat) : async Product {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  public shared ({ caller }) func addToCart(productId : Nat, quantity : Nat) : async () {
    if (quantity < 1) { Runtime.trap("Quantity must be at least 1") };

    let product = switch (products.get(productId)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };

    let cart = switch (carts.get(caller)) {
      case (null) { List.empty<CartItem>() };
      case (?existingCart) { existingCart };
    };

    cart.add({ product; quantity });
    carts.add(caller, cart);
  };

  public query ({ caller }) func viewCart() : async [CartItem] {
    switch (carts.get(caller)) {
      case (null) { [] };
      case (?cart) { cart.toArray() };
    };
  };

  public query ({ caller }) func getCartTotal() : async Nat {
    switch (carts.get(caller)) {
      case (null) { 0 };
      case (?cart) {
        var total = 0;
        for (item in cart.values()) {
          total += item.product.price * item.quantity;
        };
        total;
      };
    };
  };
};
