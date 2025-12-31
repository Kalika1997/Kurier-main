
import User from "../model/user.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        // 1st need to currenctly logged-in userID (me, as i am using the app )  - > we get this data from previous middleware (protectRoute)
        const loggedInUserId = req.user._id;

        // now we want to show all the user except me (as i am using the app ) for the side bar 
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");           // $ne = notEqual  (since we want to remove the currently logged in user from all user to show in sidebar)

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};