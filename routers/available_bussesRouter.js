const express =  require("express")
const router = express.Router()
const availabe_buses = require("../controllers/available_buses")
const admin_auth = require("../middleware/jwt_admin")
require("../index")

router.post("/create_buses",admin_auth,availabe_buses.create_available_busses)
router.patch("/edit_buses",admin_auth,availabe_buses.edit_available_busses)
router.get("/all_buses",admin_auth,availabe_buses.fetch_all_busses)
router.get("/one_bus",admin_auth,availabe_buses.find_single_bus)
router.delete("/delete_bus/:id",admin_auth,availabe_buses.delete_bus)
router.post("/available_buses",admin_auth,availabe_buses.find_by_initials)

module.exports = router