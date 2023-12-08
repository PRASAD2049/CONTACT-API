
const createFactory = (ElementModal) => {

    return async function (req, res) {

        try {

            const requestBody = req.body;

            const contact = await ElementModal.create(requestBody);

            res.status(200).json({
                status: "success",
                message: "Contact Added Successfully.",
                response: contact
            })

        } catch (error) {

            res.status(500).json({
                status: "failure",
                message: error.message
            })

        }

    }

}

const getAllFactory = (ElementModal) => {

    return async function (req, res) {

        const queryParams = req.query;

        const sortKey = queryParams.sort && queryParams.sort.split(" ")[0];
        const sortOrder = queryParams.sort && queryParams.sort.split(" ")[1];

        const selectQuery = queryParams.select;

        try {

            let contactsPromise = ElementModal.find();

            /** Sorting */

            if (sortKey) {
                if (sortOrder === 'asc') {

                    contactsPromise = contactsPromise.sort({ [sortKey]: 1 });

                } else {

                    contactsPromise = contactsPromise.sort({ [sortKey]: -1 });

                }
            }

            /** Selecting fields */

            if(selectQuery) {

                contactsPromise = contactsPromise.select(selectQuery);

            }

            /** Pagination */

            const pageNumber = queryParams.pageNumber || 1;
            const pageSize = queryParams.pageSize || 5;

            
            if(pageNumber && pageSize) {

                const elementsToSkip = (pageNumber - 1) * pageSize;

                contactsPromise = contactsPromise.skip(elementsToSkip).limit(pageSize);

            }


            const contacts = await contactsPromise;
            res.status(200).json({
                status: "success",
                message: "Contact list fetched Successfully.",
                response: contacts
            })

        } catch (error) {

            res.status(500).json({
                status: "failure",
                message: error.message
            })

        }
        
    }

}

const getByIdFactory = (ElementModal) => {

    return async function (req, res) {

        try {

            const id = req.params.id
            const contact = await ElementModal.findById(id);

            res.status(200).json({
                status: "success",
                message: "Contact fetched Successfully.",
                response: contact
            })

        } catch (error) {

            res.status(500).json({
                status: "failure",
                message: error.message
            })

        }

    }

}

const deleteByIdFactory = (ElementModal) => {

    return async function (req, res) {



    }

}

module.exports = {
    createFactory,
    getAllFactory,
    getByIdFactory,
    deleteByIdFactory
}