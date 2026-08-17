import { describe, expect, it } from 'vitest';
import { extractUploadFilename, deleteUploadedFile } from './storage';
import { writeFile, access } from 'node:fs/promises';
import { join } from 'node:path';

describe('storage upload utility', () => {
	it('extractUploadFilename extracts valid filenames and rejects invalid/unsafe paths', () => {
		expect(extractUploadFilename('/uploads/abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890.jpg')).toBe(
			'abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890.jpg'
		);
		expect(extractUploadFilename('/uploads/test-image_123.png')).toBe('test-image_123.png');
		expect(extractUploadFilename('https://example.com/test.jpg')).toBeNull();
		expect(extractUploadFilename('/uploads/../secret.txt')).toBeNull();
		expect(extractUploadFilename('/uploads/sub/path.jpg')).toBeNull();
		expect(extractUploadFilename('')).toBeNull();
		expect(extractUploadFilename(null)).toBeNull();
		expect(extractUploadFilename(undefined)).toBeNull();
	});

	it('deleteUploadedFile deletes an existing file in static/uploads and returns true', async () => {
		const uploadsDir = join(process.cwd(), 'static', 'uploads');
		const testFilename = 'test_unit_temp_file_for_deletion.jpg';
		const testFilePath = join(uploadsDir, testFilename);

		// Create a temporary test file
		await writeFile(testFilePath, Buffer.from('test image content'));

		// Verify file exists
		await expect(access(testFilePath)).resolves.toBeUndefined();

		// Delete file via storage helper
		const deleted = await deleteUploadedFile(`/uploads/${testFilename}`);
		expect(deleted).toBe(true);

		// Verify file is gone
		await expect(access(testFilePath)).rejects.toThrow();

		// Deleting again should return false (already deleted)
		const deletedAgain = await deleteUploadedFile(`/uploads/${testFilename}`);
		expect(deletedAgain).toBe(false);
	});
});
