/// <reference path="../pb_data/types.d.ts" />

migrate(
	(app) => {
		const submissionsByCollection = {
			"contact_form": [
				{
					"submittedAt": "2026-09-25T18:01:52.000Z",
					"fields": {
						"message": "No need to improve you are just perfect you have a great knowledge."
					}
				},
				{
					"submittedAt": "2026-09-25T18:05:16.000Z",
					"fields": {
						"message": "All good had a great time with you. Explained everything very good and got great knowledge about our community and religion"
					}
				}
			]
		};

		for (const [collectionName, rows] of Object.entries(submissionsByCollection)) {
			let collection;

			try {
				collection = app.findCollectionByNameOrId(collectionName);
			} catch (_) {
				continue;
			}

			for (const row of rows) {
				try {
					const record = new Record(collection);

					for (const [key, value] of Object.entries(row.fields)) {
						record.set(key, value);
					}

					record.set("submitted_at", row.submittedAt);
					app.save(record);
				} catch (err) {
					console.log("Skipping builder form submission import:", String(err));
				}
			}
		}
	},
	(app) => {},
);
