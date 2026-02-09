"""
Blender Decimation Script for rsLSM CAD Model
==============================================

HOW TO USE:
1. Open Blender with your imported GLTF model
2. Go to the "Scripting" tab at the top
3. Click "New" to create a new text block
4. Paste this entire script
5. Click "Run Script" (or press Alt+P)
6. Wait - this may take several minutes for complex models
7. Export: File → Export → glTF 2.0 (.glb)
   - Format: GLB
   - Check "Apply Modifiers"
   - Save as rslsm.glb

Target: Reduce file from 1.6GB to under 10MB
"""

import bpy

# Configuration - adjust these values if needed
DECIMATE_RATIO = 0.02  # 2% of original geometry (aggressive but usually looks fine for web)
MIN_FACES = 100        # Don't decimate objects with fewer faces than this
APPLY_MODIFIERS = True # Apply the decimation (makes it permanent)

def decimate_all_meshes():
    """Apply decimate modifier to all mesh objects in the scene."""

    # Switch to object mode if not already
    if bpy.context.active_object and bpy.context.active_object.mode != 'OBJECT':
        bpy.ops.object.mode_set(mode='OBJECT')

    # Deselect all
    bpy.ops.object.select_all(action='DESELECT')

    # Get all mesh objects
    mesh_objects = [obj for obj in bpy.data.objects if obj.type == 'MESH']
    total_objects = len(mesh_objects)

    print(f"\n{'='*60}")
    print(f"DECIMATING {total_objects} MESH OBJECTS")
    print(f"Target ratio: {DECIMATE_RATIO} ({DECIMATE_RATIO*100:.1f}% of original)")
    print(f"{'='*60}\n")

    processed = 0
    skipped = 0
    total_faces_before = 0
    total_faces_after = 0

    for i, obj in enumerate(mesh_objects):
        # Get face count
        face_count = len(obj.data.polygons)
        total_faces_before += face_count

        # Skip objects with very few faces
        if face_count < MIN_FACES:
            print(f"[{i+1}/{total_objects}] SKIP: {obj.name} ({face_count} faces - too few)")
            total_faces_after += face_count
            skipped += 1
            continue

        print(f"[{i+1}/{total_objects}] Processing: {obj.name} ({face_count} faces)")

        # Select this object
        bpy.context.view_layer.objects.active = obj
        obj.select_set(True)

        # Remove any existing decimate modifiers
        for mod in obj.modifiers:
            if mod.type == 'DECIMATE':
                obj.modifiers.remove(mod)

        # Add decimate modifier
        decimate = obj.modifiers.new(name="Decimate", type='DECIMATE')
        decimate.decimate_type = 'COLLAPSE'
        decimate.ratio = DECIMATE_RATIO

        # Apply the modifier if requested
        if APPLY_MODIFIERS:
            try:
                bpy.ops.object.modifier_apply(modifier="Decimate")
                new_face_count = len(obj.data.polygons)
                total_faces_after += new_face_count
                print(f"         → Reduced to {new_face_count} faces ({new_face_count/face_count*100:.1f}%)")
            except Exception as e:
                print(f"         → Error applying modifier: {e}")
                total_faces_after += face_count

        # Deselect
        obj.select_set(False)
        processed += 1

    # Summary
    print(f"\n{'='*60}")
    print(f"DECIMATION COMPLETE")
    print(f"{'='*60}")
    print(f"Objects processed: {processed}")
    print(f"Objects skipped:   {skipped}")
    print(f"Total faces before: {total_faces_before:,}")
    print(f"Total faces after:  {total_faces_after:,}")
    print(f"Reduction: {(1 - total_faces_after/total_faces_before)*100:.1f}%")
    print(f"\nNEXT STEPS:")
    print(f"1. File → Export → glTF 2.0 (.glb/.gltf)")
    print(f"2. Format: GLB")
    print(f"3. Check 'Apply Modifiers'")
    print(f"4. Enable 'Compression' if available")
    print(f"5. Save as: rslsm.glb")
    print(f"6. Target size: < 10MB")
    print(f"{'='*60}\n")

def remove_duplicate_materials():
    """Simplify materials to reduce file size."""
    print("\nSimplifying materials...")

    # Count materials
    mat_count = len(bpy.data.materials)
    print(f"Found {mat_count} materials")

    # Remove unused materials
    for mat in bpy.data.materials:
        if mat.users == 0:
            bpy.data.materials.remove(mat)

    new_count = len(bpy.data.materials)
    print(f"Removed {mat_count - new_count} unused materials")

def cleanup_mesh_data():
    """Remove loose vertices and edges to reduce complexity."""
    print("\nCleaning up mesh data...")

    for obj in bpy.data.objects:
        if obj.type == 'MESH':
            bpy.context.view_layer.objects.active = obj
            obj.select_set(True)

            # Enter edit mode
            bpy.ops.object.mode_set(mode='EDIT')

            # Select all
            bpy.ops.mesh.select_all(action='SELECT')

            # Remove doubles (merge very close vertices)
            try:
                bpy.ops.mesh.remove_doubles(threshold=0.001)
            except:
                pass

            # Back to object mode
            bpy.ops.object.mode_set(mode='OBJECT')
            obj.select_set(False)

    print("Cleanup complete")

# Run the script
if __name__ == "__main__":
    print("\n" + "="*60)
    print("RSSLM CAD MODEL OPTIMIZATION SCRIPT")
    print("="*60)

    # Step 1: Clean up materials
    remove_duplicate_materials()

    # Step 2: Decimate all meshes
    decimate_all_meshes()

    print("\nScript finished! Now export as GLB.")
