import React, { createContext, useContext, useReducer, useMemo, useState, useEffect } from "react";

export const StateContext = createContext();

export const LoaderContext = createContext({
	loading: false,
	setLoading: () => { }
});


export const RoleContext = createContext({
	role: "user",
	setRole: () => { }
});
export const TokenContext = createContext({
	token: null,
	setToken: () => { }
});
export const LayoutContext = createContext({
	layout: null,
	setLayout: () => { }
});

const StateProvider = ({ reducer, children }) => {
	const [loading, setLoading] = useState(false);
	const [layout, setLayout] = useState();
	const [role, setRole] = useState();
	const [token, setToken] = useState();
	 
	useEffect(() => {

		const userToken = localStorage.getItem("token"),
			userRole = localStorage.getItem("role");
		if (userToken) setToken(userToken);
		if (userRole) setRole(userRole);
	}, [])

 
	const loader = { loading, setLoading };
	const userRole = { role, setRole };
	const userToken = { token, setToken };
	const siteLayout = { layout, setLayout };
	
	const [state, dispatch] = useReducer(reducer, {});
	const store = useMemo(() => [state, dispatch], [state], loader);
	   
	return (
		
		<StateContext.Provider value={store}>
			<LayoutContext.Provider value={siteLayout}>
					<LoaderContext.Provider value={loader}>
						<RoleContext.Provider value={userRole}>
							<TokenContext.Provider value={userToken}>
										{children}
							</TokenContext.Provider>
						</RoleContext.Provider>
					</LoaderContext.Provider>
			</LayoutContext.Provider>
		</StateContext.Provider>
	);
};

export const useStateValue = () => useContext(StateContext);

export default StateProvider;